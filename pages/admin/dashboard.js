import axios from 'axios';
import Layout from '../../components/Layout';
import SideNav from '../../components/SideNav';
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useReducer } from 'react';
import { getError } from '../../utils/error';
  
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};
  
function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, summary: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

const AdminDashboard = () => {
  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: '',
  });
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/summary`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  const data = {
    labels: summary.salesData.map((x) => x._id), // 2022/01 2022/03
    datasets: [
      {
        label: 'Sales',
        backgroundColor: '#207a00',
        data: summary.salesData.map((x) => x.totalSales),
      },
    ],
  };

  return (
    <Layout>
      <div className="admin-container page-contain bg-white py-5">
        <Container fluid className="pt-5">
          <Row className="row">
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
                <Card className="card admin-card-container">
                  <Card.Body className="card-body">
                    <h1 className="card-title text-center">Dashboard</h1>
                    <Row className="gx-5">
                      <Col xxl={3} md={6} className="mb-5">
                        <Card className="shadow">
                          <Card.Body className="px-4">
                            <h2 className="text-center">${summary.ordersPrice}</h2>
                            <h3 className="text-center">Sales</h3>
                            <Card.Text className="text-center">
                              <Link href="/admin/orders" type="button" className="btn btn-link">
                                View Sales
                              </Link>
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col xxl={3} md={6} className="mb-5">
                        <Card className="shadow">
                          <Card.Body className="px-4">
                            <h2 className="text-center">{summary.ordersCount}</h2>
                            <h3 className="text-center">Orders</h3>
                            <Card.Text className="text-center">
                              <Link href="/admin/orders" type="button" className="btn btn-link">
                                View Orders
                              </Link>
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col xxl={3} md={6} className="mb-5">
                        <Card className="shadow">
                          <Card.Body className="px-4">
                            <h2 className="text-center">{summary.productsCount}</h2>
                            <h3 className="text-center">Products</h3>
                            <Card.Text className="text-center">
                              <Link href="/admin/products" type="button" className="btn btn-link">
                                View Products
                              </Link>
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col xxl={3} md={6} className="mb-5">
                        <Card className="shadow">
                          <Card.Body className="px-4">
                            <h2 className="text-center">{summary.usersCount}</h2>
                            <h3 className="text-center">Users</h3>
                            <Card.Text className="text-center">
                              <Link href="/admin/users" type="button" className="btn btn-link">
                                View Vendors
                              </Link>
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                    <Row className="row">
                      <Col className="col">
                        <h2 className="text-center py-3">Sales Report</h2>
                        <Bar
                          options={{
                            legend: { display: true, position: 'right' },
                          }}
                          data={data}
                        />
                      </Col>
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

AdminDashboard.auth = { adminOnly: true }
export default AdminDashboard;