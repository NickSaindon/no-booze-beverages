import axios from 'axios';
import Link from 'next/link';
import { useEffect, useReducer } from 'react';
import Layout from '../components/Layout';
import { Container, Row } from 'react-bootstrap';
import { getError } from '../utils/error';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, orders: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const OrderHistory = () => {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: '',
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/history`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch(err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
      }
    }
    fetchOrders();
  }, []);


  return (
    <Layout title="No Booze Beverages | Order History">
      <div className="orders-container page-contain py-5">
        <Container className="pt-5">
          <h1 className="text-center">Order History</h1>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="">{error}</div>
          ) : (
            <Row className="py-5">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className="text-center">Id</th>
                    <th scope="col" className="text-center">Date</th>
                    <th scope="col" className="text-center">Total</th>
                    <th scope="col" className="text-center">Paid</th>
                    <th scope="col" className="text-center">Delivered</th>
                    <th scope="col" className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className="align-middle text-center">{(order._id.substring(20, 24))}</td>
                      <td className="align-middle text-center">{order.createdAt.substring(0, 10)}</td>
                      <td className="align-middle text-center">${order.totalPrice.toFixed(2)}</td>
                      <td className="align-middle text-center">
                          {order.isPaid
                          ? `${order.paidAt.substring(0, 10)}`
                          : 'not paid'}
                      </td>
                      <td className="align-middle text-center">
                          {order.isDelivered
                          ? `${order.deliveredAt.substring(0, 10)}`
                          : 'not delivered'}
                      </td>
                      <td className="align-middle text-center">
                          <Link href={`/order/${order._id}`}>
                              <button type="button" className="btn btn-primary">Details</button>
                          </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Row>    
          )}
        </Container>
      </div>
    </Layout>
  )
}

OrderHistory.auth = true;
export default OrderHistory;