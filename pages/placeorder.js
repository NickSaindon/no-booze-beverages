import { useContext, useState, useReducer, useEffect } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/router';
import { getError } from '../utils/error';
import Cookies from 'js-cookie';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { ToastContainer, toast, Slide } from "react-toastify";
import moment from 'moment';

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
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress } = cart;

  const [orderId, setOrderId] = useState(null);

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const [poLoading, setPoLoading] = useState(false);
  
  const [
    {
      loading,
      error,
      order,
      successPay,
      loadingPay
    },
    orderDispatch,
  ] = useReducer(reducer, {
    loading: false, // Set initial loading state to false
    order: {},
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        orderDispatch({ type: 'FETCH_REQUEST' });
  
        // Use orderId if available, otherwise fetch it from the API
        const orderToFetch = orderId ? orderId : data.id;
        console.log('Order Id', orderId);
        const { data } = await axios.get(`/api/orders/${JSON.parse(JSON.stringify(orderToFetch))}`);
        orderDispatch({ type: 'FETCH_SUCCESS', payload: data });
        console.log('Data fetched successfully:', data);
      } catch (err) {
        orderDispatch({ type: 'FETCH_FAIL', payload: getError(err) });
        console.error('Error fetching data:', err);
      }
    };
  
    const loadPaypalScript = async () => {
      try {
        const { data: clientId } = await axios.get('/api/keys/paypal');
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
        console.log('PayPal script loaded successfully');
      } catch (err) {
        console.error('Error loading PayPal script:', err);
      }
    };
  
    if (successPay && orderId) {
      console.log('enter if statement');
      fetchData();
      orderDispatch({ type: 'PAY_RESET' });
      dispatch({ type: 'CART_CLEAR_ITEMS' });
      router.push('/order-success');
    } else {
      console.log('enter else statement');
      if (!orderId) {
        console.log("loading paypal script");
        loadPaypalScript();
      }
    }
  }, [orderId, successPay, paypalDispatch]);

    const {
      orderItems,
      itemsPrice = round2(
        cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
      ),
      taxPrice = round2(itemsPrice * 0.15),
      shippingPrice = itemsPrice > 200 ? 0 : 15,
      totalPrice = round2(itemsPrice + shippingPrice + taxPrice),
      isPaid,
      paidAt,
    } = order;

    const placeOrderHandler = async () => {
      try {
        setPoLoading(true);
        const { data } = await axios.post('/api/orders', {
          orderItems: cartItems,
          shippingAddress,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        });
        setOrderId(data._id); // Store the order ID
        setPoLoading(false);
        orderDispatch({ type: 'CART_CLEAR_ITEMS' });
        Cookies.set(
          'cart',
          JSON.stringify({
            ...cart,
            cartItems: [],
          })
        );
      } catch (err) {
        setPoLoading(false);
        toast.error(getError(err), {
          theme: 'colored'
        });
      }
    };

    function createOrder(data, actions) {
      return actions.order
        .create({
          purchase_units: [
            {
              amount: { value: totalPrice },
            },
          ],
        })
        .then((orderID) => {
          return orderID;
        });
    }

    function onApprove(data, actions) {
      return actions.order.capture().then(async function (details) {
        try {
          orderDispatch({ type: 'PAY_REQUEST' });
    
          // Use the order ID from PayPal details
          // const orderId = details.id;
    
          // Update the local state to mark the order as paid
          orderDispatch({ type: 'PAY_SUCCESS' });
    
          // Fetch the order details after payment
          orderDispatch({ type: 'FETCH_REQUEST' });
          const { data } = await axios.get(`/api/orders/${JSON.parse(JSON.stringify(order._id))}`, details);
          orderDispatch({ type: 'FETCH_SUCCESS', payload: data });
    
          // Reset the order ID after payment
          setOrderId(null);

          toast.success('Order is paid successfully', {
            theme: 'colored'
          });
        } catch (err) {
          orderDispatch({ type: 'PAY_FAIL', payload: getError(err) });
          toast.error(getError(err), {
            theme: 'colored'
          });
        }
      });
    }

  function onError(err) {
    toast.error(getError(err), {
      theme: 'colored'
    });
  }

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
            <h1 className="text-center">Order Review</h1>
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
                      <b>{shippingAddress.fullName}</b><br/>
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
                <Card className="shadow mb-4">
                    <Card.Body>
                      <h2 className="card-title">Payment</h2>
                        {isPaid ? (
                            <span className="badge bg-success">Paid on {moment(new Date(paidAt)).format('MM/DD/YYYY')}</span>
                        ) : (
                            <span className="badge bg-danger">Not paid</span>
                        )}
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
                          <tr key={item._id}>
                          <td>
                          <Link href={`/product/${item.slug}`} passHref>
                            <Image src={item.imageOne} width={80} height={60} alt="..." />
                          </Link>
                          </td>
                          <td className="align-middle">{item.name}</td>
                          <td className="align-middle">{item.flavor}</td>
                          <td className="align-middle">{item.sizeSelected}</td>
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
                    {!isPaid && (
                        <div>
                          {isPending ? (
                            <div>Loading...</div>
                          ) : (
                            <div className="w-100">
                              <PayPalButtons
                                createOrder={createOrder}
                                onApprove={onApprove}
                                onError={onError}
                                onClick={placeOrderHandler}
                              ></PayPalButtons>
                            </div>
                          )}
                          {loadingPay && <div>Loading...</div>}
                        </div>
                      )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false });
