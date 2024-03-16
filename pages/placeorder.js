import { useContext, useState, useReducer } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import DirectPost from '../utils/directPost'; 
import { ToastContainer, toast, Slide } from "react-toastify";
import { Controller, useForm } from 'react-hook-form';
import NumberFormat from "react-number-format";

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: false, errorPay: action.payload };
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false, errorPay: '' };
    default:
      return state; // Return state in default case
  }
}

const PlaceOrder = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress } = cart;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  
  const [
    {
      loading,
      error,
      order
    },
  ] = useReducer(reducer, {
    loading: false, // Set initial loading state to false
    order: {},
    error: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const [dp, setDp] = useState(null); // DirectPost instance
  const [isAddress, setIsAddress] = useState(true)

  // useEffect(() => {

  //   setDp(new DirectPost('{security_key}')); // Initialize DirectPost instance

  //   const fetchData = async () => {
  //     try {
  //       orderDispatch({ type: 'FETCH_REQUEST' });
  
  //       // Use orderId if available, otherwise fetch it from the API
  //       const orderToFetch = orderId ? orderId : data.id;
  //       console.log('Order Id', orderId);
  //       const { data } = await axios.get(`/api/orders/${JSON.parse(JSON.stringify(orderToFetch))}`);
  //       orderDispatch({ type: 'FETCH_SUCCESS', payload: data });
  //       console.log('Data fetched successfully:', data);
  //     } catch (err) {
  //       orderDispatch({ type: 'FETCH_FAIL', payload: getError(err) });
  //       console.error('Error fetching data:', err);
  //     }
  //   };
  
  //   if (successPay && orderId) {
  //     console.log('enter if statement');
  //     fetchData();
  //     orderDispatch({ type: 'PAY_RESET' });
  //     dispatch({ type: 'CART_CLEAR_ITEMS' });
  //     router.push('/order-success');
  //   } else {
  //     console.log('enter else statement');
  //   }
  // }, [orderId, successPay]);

    const {
      itemsPrice = round2(
        cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
      ),
      taxPrice = round2(itemsPrice * 0.15),
      shippingPrice = itemsPrice > 200 ? 0 : 15,
      totalPrice = round2(itemsPrice + shippingPrice + taxPrice)
    } = order;

    const submitHandler = async ({ first_name, last_name, ccnumber, ccexp, cvv, address1, city, state, zip }) => {
      try {
        let billingAddress;
    
        if (isAddress) {
          billingAddress = {
            first_name: first_name,
            last_name: last_name,
            address1: shippingAddress.address,
            city: shippingAddress.city,
            state: shippingAddress.state,
            zip: shippingAddress.zipCode
          };
        } else {
          billingAddress = {
            first_name,
            last_name,
            address1,
            city,
            state,
            zip
          };
        }
    
        const dp = new DirectPost(`${process.env.ALLAYPAY_API_KEY}`);
        dp.setBilling(billingAddress);
    
        const response = dp.doSale(totalPrice, ccnumber, ccexp, cvv);
        console.log("response", response);
          const orderData = {
            orderItems: cartItems,
            shippingAddress,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
          };
          
          const orderResponse = await axios.post('/api/orders', orderData);
          const orderId = orderResponse.data.orderId; // Extract orderId from the response
  
          let config = {
            method: 'post',
            url: `${process.env.NEXT_PUBLIC_API_URL}/api/receipt`,
            headers: {
              'Content-Type': 'application/json',
            },
            data: { orderId, orderData },
          };
      
          await axios(config);

          dispatch({ type: 'CART_CLEAR_ITEMS' });
          Cookies.remove('cart');
          router.push({
            pathname: '/order-success',
            query: { orderId },
          });
      } catch (error) {
        toast.error("Unable to complete the transaction at this time.", { theme: 'colored' });
      }
    };
    

  return (
    <Layout>
      <div className="place-order-container page-contain py-5">
        <ToastContainer 
          position="top-center" 
          draggable={false} 
          transition={Slide} 
          autoClose={3000}
          hideProgressBar={true}
          className="toast-alert"
        />
        <Container fluid className="pt-5">
            <h1 className="text-center">Order Review & Payment</h1>
          {loading ? (
              <div className="spinner-border customer-spinner text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div> 
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : (
            <Row>
              <Col lg={8}>
                <Card className="shadow mb-4">
                  <Card.Body>
                    <h2 className="card-title">Shipping Address</h2>
                    <p>
                      <b>{shippingAddress.firstName} {shippingAddress.lastName}</b><br/>
                      <b>{shippingAddress.phone}</b><br/>
                      <b>{shippingAddress.email}</b><br/>
                      {shippingAddress.address}<br/>
                      {shippingAddress.city},{' '}
                      {shippingAddress.state},{' '}
                      {shippingAddress.zipCode} 
                    </p>
                    <Link href="/shipping">
                      <button type="button" className="btn btn-primary">Edit</button>
                    </Link>
                  </Card.Body>
                </Card>
                <Card className="shadow card order-card">
                  <Card.Body className="card-body">
                    <h2 className="card-title">Order Items</h2>
                    <table className="table text-center">
                      <thead>
                        <tr>
                          <th scope="col">Image</th>
                          <th scope="col">Name</th>
                          <th scope="col">Flavor</th>
                          <th scope="col">Size</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Price</th>
                          <th scope="col">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                      {cartItems.map((item) => (
                          <tr key={`${item._id}-${item.packSizeSelected}`}>
                          <td>
                          <Link href={`/product/${item.slug}`} passHref>
                            <Image src={item.imageOne} width={80} height={60} alt="..." />
                          </Link>
                          </td>
                          <td className="align-middle">{item.name}</td>
                          <td className="align-middle">{item.flavor}</td>
                          <td className="align-middle">{item.packSizeSelected}</td>
                          <td className="align-middle">{item.quantity}</td>
                          <td className="align-middle">${item.price.toFixed(2)}</td>
                          <td className="align-middle">
                              ${Number(item.quantity * item.price).toFixed(2)}
                          </td>
                          </tr>
                      ))}
                    </tbody>
                    </table>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4}>
                <Row>
                  <Col>
                    <Card className="shadow card">
                      <Card.Body className="card-body">
                        <h2 className="card-title">Order Summary</h2>
                        <div className="summary d-flex justify-content-between">
                            <h6>Items:</h6>
                            <span>${itemsPrice.toFixed(2)}</span>
                        </div>
                        <div className=" summary d-flex justify-content-between">
                            <h6>Tax:</h6>
                            <span>${taxPrice.toFixed(2)}</span>
                        </div>
                        <div className=" summary d-flex justify-content-between">
                            <h6>Shipping:</h6>
                            <span>${shippingPrice.toFixed(2)}</span>
                        </div>
                        <div className="summary-total d-flex justify-content-between">
                            <h5 className="fw-bold">Total:</h5>
                            <span><h5 className="fw-bold">${totalPrice.toFixed(2)}</h5></span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Card className="shadow card my-3">
                      <Card.Header className="bg-white">
                        <h2 className="card-title">Credit Card</h2>
                        <div className="d-flex justify-content-between">
                          <Image src="/images/icons/visa_icon.png" width={45} height={45} alt="..." />
                          <Image src="/images/icons/mastercard_icon.png" width={45} height={45} alt="..." />
                          <Image src="/images/icons/discover_icon.png" width={45} height={45} alt="..." />
                          <Image src="/images/icons/amex_card_icon.png" className="mt-2" width={48} height={30} alt="..." />
                        </div>
                      </Card.Header>
                      <Card.Body>
                        <form onSubmit={handleSubmit(submitHandler)} className="col-lg-12 col-md-12 col-sm-12 form-shipment justify-content-center">
                          <Row>
                            <Col>
                              <div className="form-floating">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="ccnumber"
                                  placeholder="Card Number" 
                                  {...register('ccnumber', {
                                    required: 'Please enter card number',
                                  })}
                                />
                                {errors.ccnumber && (
                                  <div className="invalid-feedback">
                                    {errors.ccnumber.message}
                                  </div>
                                )}
                                <label htmlFor="ccnumber">Card Number</label>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg={6} md={12}>
                              <div className="form-floating">
                                <Controller 
                                  name="ccexp"
                                  control={control}
                                  rules={{
                                    required: true,
                                    pattern: /\d{2}\/\d{2}/
                                  }}
                                  render={({ field: {onChange, ccexp, value} }) => (
                                    <NumberFormat
                                      format="##/##"
                                      name={ccexp}
                                      className={`form-control ${errors.ccexp ? 'is-invalid' : ''}`}
                                      value={value}
                                      id="ccexp" 
                                      placeholder="Expn Date MMYY" 
                                      onChange={onChange}
                                    />
                                  )}
                                />
                                <div className="invalid-feedback">
                                    {errors.ccexp
                                          ? errors.ccexp.type === 'pattern'
                                            ? 'Expiration date is not completed'
                                            : 'Expiration date is required'
                                          : ''
                                    }
                                </div>
                                <label htmlFor="floatingInput">Expn Date MMYY</label>
                              </div>
                            </Col>
                            <Col lg={6} md={12}>
                              <div className="form-floating">
                                <Controller 
                                  name="cvv"
                                  control={control}
                                  rules={{
                                    required: true,
                                    pattern: /\d{3}/
                                    ,
                                  }}
                                  render={({ field: {onChange, cvv, value} }) => (
                                    <NumberFormat
                                      format="###"
                                      name={cvv}
                                      className={`form-control ${errors.cvv ? 'is-invalid' : ''}`}
                                      value={value}
                                      id="cvv" 
                                      placeholder="CVV" 
                                      onChange={onChange}
                                    />
                                  )}
                                />
                                <div className="invalid-feedback">
                                    {errors.cvv
                                          ? errors.cvv.type === 'pattern'
                                            ? 'cvv is not completed'
                                            : 'cvv is required'
                                          : ''
                                    }
                                </div>
                                <label htmlFor="cvv">CVV</label>
                              </div>

                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <div className="form-floating">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="first_name"
                                  placeholder="First Name" 
                                  {...register('first_name', {
                                    required: 'Please enter cardholder first name',
                                  })}
                                />
                                {errors.first_name && (
                                  <div className="invalid-feedback">
                                    {errors.first_name.message}
                                  </div>
                                )}
                                <label htmlFor="first_name">First Name</label>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <div className="form-floating">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="last_name"
                                  placeholder="Last Name" 
                                  {...register('last_name', {
                                    required: 'Please enter cardholder last name',
                                  })}
                                />
                                {errors.last_name && (
                                  <div className="invalid-feedback">
                                    {errors.last_name.message}
                                  </div>
                                )}
                                <label htmlFor="last_name">Last Name</label>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <div className="form-check">
                                <input 
                                  className="form-check-input" 
                                  type="checkbox" 
                                  name="isBillingAddress"
                                  onChange={(e) => setIsAddress(e.target.checked)}
                                  checked={isAddress}
                                  id="isBillingAddress"
                                />
                                <label className="form-check-label" htmlFor="gridCheck">
                                  Use shipping address as billing address
                                </label>
                              </div> 
                            </Col>
                          </Row>
                          {!isAddress && (
                            <div className="mt-3">
                              <h5>Billing Address</h5>
                              <Row>
                                <Col>
                                  <div className="form-floating">
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="address1"
                                      placeholder="Address" 
                                      {...register('address1', {
                                        required: 'Please enter cardholder last name',
                                      })}
                                    />
                                    {errors.address1 && (
                                      <div className="invalid-feedback">
                                        {errors.address1.message}
                                      </div>
                                    )}
                                    <label htmlFor="address1">Address</label>
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <div className="form-floating">
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="city"
                                      placeholder="City" 
                                      {...register('city', {
                                        required: 'Please enter city',
                                      })}
                                    />
                                    {errors.city && (
                                      <div className="invalid-feedback">
                                        {errors.city.message}
                                      </div>
                                    )}
                                    <label htmlFor="city">City</label>
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg={6} md={12}>
                                  <div className="form-floating">
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="state"
                                      placeholder="State" 
                                      {...register('state', {
                                        required: 'Please enter a state',
                                      })}
                                    />
                                    {errors.state && (
                                      <div className="invalid-feedback">
                                        {errors.state.message}
                                      </div>
                                    )}
                                    <label htmlFor="state">State</label>
                                  </div>
                                </Col>
                                <Col lg={6} md={12}>
                                  <div className="form-floating">
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="zip"
                                      placeholder="Zip" 
                                      {...register('zip', {
                                        required: 'Please enter cvv number',
                                      })}
                                    />
                                    {errors.zip && (
                                      <div className="invalid-feedback">
                                        {errors.zip.message}
                                      </div>
                                    )}
                                    <label htmlFor="zip">Zip</label>
                                  </div>
                                </Col>
                              </Row>

                            </div>
                          )}
                          <button className="w-100 btn btn-lg btn-primary my-4" type="submit">
                            Submit Payment  
                          </button>
                        </form>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false });
