import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useReducer } from 'react';
import { ToastContainer, toast, Slide } from "react-toastify";
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
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
  
      case 'DELIVER_REQUEST':
        return { ...state, loadingDeliver: true };
      case 'DELIVER_SUCCESS':
        return { ...state, loadingDeliver: false, successDeliver: true };
      case 'DELIVER_FAIL':
        return { ...state, loadingDeliver: false };
      case 'DELIVER_RESET':
        return {
          ...state,
          loadingDeliver: false,
          successDeliver: false,
        };
  
      default:
        state;
    }
  }

const OrderScreen = () => {
    const { data: session } = useSession();
    // order/:id
  
    const { query } = useRouter();
    const orderId = query.id;

  const [
    {
      loading,
      error,
      order,
      successPay,
      loadingDeliver,
      successDeliver,
    },
    dispatch,
    ] = useReducer(reducer, {
      loading: true,
      order: {},
      error: '',
    });

    useEffect(() => {
        const fetchOrder = async () => {
          try {
            dispatch({ type: 'FETCH_REQUEST' });
            const { data } = await axios.get(`/api/orders/${JSON.parse(JSON.stringify(orderId))}`);
            dispatch({ type: 'FETCH_SUCCESS', payload: data });
          } catch (err) {
            dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
          }
        };
        if (
          !order._id ||
          successDeliver ||
          (order._id && order._id !== orderId)
        ) {
          fetchOrder();
          if (successPay) {
            dispatch({ type: 'PAY_RESET' });
          }
          if (successDeliver) {
            dispatch({ type: 'DELIVER_RESET' });
          }
        }
      }, [order, orderId, successDeliver]);

      const {
        shippingAddress,
        orderItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        isPaid,
        paidAt,
        isDelivered,
        deliveredAt,
      } = order;

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
            dispatch({ type: 'PAY_REQUEST' });
            const { data } = await axios.put(
              `/api/orders/${order._id}/pay`,
              details
            );
            dispatch({ type: 'PAY_SUCCESS', payload: data });
            toast.success('Order is paid successfully', {
              theme: 'colored'
            });
          } catch (err) {
            dispatch({ type: 'PAY_FAIL', payload: getError(err) });
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
    
      async function deliverOrderHandler() {
        try {
          dispatch({ type: 'DELIVER_REQUEST' });
          const { data } = await axios.put(
            `/api/admin/orders/${JSON.parse(JSON.stringify(order._id))}/deliver`,
            {}
          );
          dispatch({ type: 'DELIVER_SUCCESS', payload: data });
          toast.success('Order is delivered', {
            theme: "colored"
          });
        } catch (err) {
          dispatch({ type: 'DELIVER_FAIL', payload: getError(err) });
          toast.error(getError(err), {
            theme: "colored"
          });
        }
      }

  return (
    <Layout title={`Order ${orderId}`}>
      <div className="place-order-container page-contain py-5">
        <ToastContainer 
          position="top-center" 
          draggable={false} 
          transition={Slide} 
          autoClose={5000}
          hideProgressBar={true}
          className="toast-alert"
        />
          <Container fluid className="pt-5">
            {session.user.isAdmin ? (
              <Link href="/admin/orders">
                <button type="button" className="btn btn-link"><i className="bi bi-arrow-left"></i> back to orders</button>
              </Link>
            ) : (
              <Link href="/order-history">
                <button type="button" className="btn btn-link"><i className="bi bi-arrow-left"></i> back to order history</button>
              </Link>
            )}
            <h1 className="text-center">{`Order ${orderId}`}</h1>
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
                      {isDelivered ? (
                        <span className="badge bg-success">Delivered at {moment(new Date(deliveredAt)).format('MM/DD/YYYY')}</span>
                      ) : (
                        <span className="badge bg-danger">Not delivered</span>
                      )}
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
                  <Card className="shadow mb-4">
                    <Card.Body>
                      <h2 className="card-title">Order Items</h2>
                      <table className="table text-center">
                        <thead>
                          <tr>
                            <th scope="col">Image</th>
                            <th scope="col">Name</th>
                            <th scope="col">Size</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                            <th scope="col">Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderItems.map((item) => (
                            <tr key={`${item._id}-${item.packSizeSelected}`}>
                              <td>
                                <Link href={`/product/${item.slug}`}>
                                    <Image src={item.imageOne} width={80} height={60} alt={`Image of ${item.name} ${item.size}`} />
                                </Link>
                              </td>
                              <td className="align-middle">{item.name} {item.color}</td>
                              <td className="align-middle">{item.size}</td>
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
                  <Card className="shadow mb-4">
                    <Card.Body>
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
                      {session.user.isAdmin && order.isPaid && !order.isDelivered && (
                        <div>
                          <button 
                            className="w-100 btn btn-lg btn-primary" 
                            onClick={deliverOrderHandler}
                          >
                          {loadingDeliver ? (
                            <>
                              <span className="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"></span>
                              <span className="visually-hidden">Loading...</span>
                            </>
                            ) : (
                              "Deliver Order"
                            )}
                          </button>
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
  )
}

export default OrderScreen;