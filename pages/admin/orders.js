import axios from 'axios';
import Layout from '../../components/Layout';
import SideNav from '../../components/SideNav';
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { useEffect, useReducer } from 'react';
import { getError } from '../../utils/error';

function reducer(state, action) {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true, error: '' };
      case 'FETCH_SUCCESS':
        return { ...state, loading: false, orders: action.payload, error: '' };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
      default:
        state;
    }
  }

const AdminOrders = () => {
    const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
        loading: true,
        orders: [],
        error: '',
      });
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            dispatch({ type: 'FETCH_REQUEST' });
            const { data } = await axios.get(`/api/admin/orders`);
            dispatch({ type: 'FETCH_SUCCESS', payload: data });
          } catch (err) {
            dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
          }
        };
        fetchData();
      }, []);

  return (
    <Layout title="Admin Categories">
      <div className="admin-container page-contain bg-white py-5">
        <Container fluid className="pt-5">
          <Row>
            <Col lg={2} className="mb-3">
              <SideNav />
            </Col>
            <Col lg={10}>
              {loading ? (
                <div className="spinner-border customer-spinner text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>      
              ) : error ? (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              ) : (
                <Card className="card admin-card-container p-4">
                  <Card.Body>
                    <Row className="gx-5">
                      <Card.Title className="text-center text-primary fs-1">Orders</Card.Title>
                      <Table responsive="xl" striped bordered hover>
                      <thead className="border-b">
                          <tr>
                            <th className="p-3 text-center text-primary">ID</th>
                            <th className="p-3 text-center text-primary">USER/CUSTOMER</th>
                            <th className="p-3 text-center text-primary">DATE</th>
                            <th className="p-3 text-center text-primary">TOTAL</th>
                            <th className="p-3 text-center text-primary">PAID</th>
                            <th className="p-3 text-center text-primary">DELIVERED</th>
                            <th className="p-3 text-center text-primary">ACTION</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((order) => (
                            <tr key={order._id} className="border-b">
                              <td className="p-2 text-center align-middle">{order._id.substring(20, 24)}</td>
                              <td className="p-2 text-center align-middle">
                                {order.user ? order.user.name : order.shippingAddress.fullName}
                                {console.log(order)}
                              </td>
                              <td className="p-2 text-center align-middle">
                                {order.createdAt.substring(0, 10)}
                              </td>
                              <td className="p-2 text-center align-middle">${order.totalPrice.toFixed(2)}</td>
                              <td className="p-2 text-center align-middle">
                                {order.isPaid
                                ? `${order.paidAt.substring(0, 10)}`
                                : 'not paid'}
                              </td>
                              <td className="p-2 text-center align-middle">
                                {order.isDelivered
                                ? `${order.deliveredAt.substring(0, 10)}`
                                : 'not delivered'}
                              </td>
                              <td className="p-2 text-center align-middle">
                                <Link href={`/order/${order._id}`} type="button" className="btn btn-primary">
                                  Details
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Row>
                  </Card.Body>
                </Card>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  )
}

AdminOrders.auth = { adminOnly: true }
export default AdminOrders;