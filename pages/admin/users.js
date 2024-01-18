import axios from 'axios';
import Layout from '../../components/Layout';
import SideNav from '../../components/SideNav';
import Link from 'next/link';
import { useEffect, useReducer } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { ToastContainer, toast, Slide } from "react-toastify";
import { getError } from '../../utils/error';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, users: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true };
    case 'DELETE_SUCCESS':
      return { ...state, loadingDelete: false, successDelete: true };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
}

const AdminUsers = () => {
  const [{ loading, error, users, successDelete, loadingDelete }, dispatch] =
  useReducer(reducer, {
    loading: true,
    users: [],
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/users`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
  }, [successDelete]);

  const deleteHandler = async (userId) => {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    try {
      dispatch({ type: 'DELETE_REQUEST' });
      await axios.delete(`/api/admin/users/${userId}`);
      dispatch({ type: 'DELETE_SUCCESS' });
      toast.success('User deleted successfully');
    } catch (err) {
      dispatch({ type: 'DELETE_FAIL' });
      toast.error(getError(err));
    }
  };

  return (
    <Layout>
      <div className="admin-container page-contain bg-white py-5">
        <Container fluid className="pt-5">
          <Row>
            <Col lg={2}>
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
                <Card className="admin-card-container">
                  <Card.Body>
                    <Tabs
                      defaultActiveKey="customers"
                      id="uncontrolled-tab-example"
                      className="mb-3"
                      justify
                    >
                      <Tab eventKey="customers" title="Customers">
                        <Row className="py-5 px-3">
                          <Card.Title className="fs-1 text-center text-primary">Customer Users</Card.Title >
                          <Table striped="rows">
                            <thead className="border-b">
                              <tr>
                                <th className="p-3 text-center text-primary">ID</th>
                                <th className="p-3 text-center text-primary">NAME</th>
                                <th className="p-3 text-center text-primary">EMAIL</th>
                                <th className="p-3 text-center text-primary">ADMIN</th>
                                <th className="p-3 text-center text-primary">VENDOR</th>
                                <th className="p-3 text-center text-primary">MANUFACTURER</th>
                                <th className="p-3 text-center text-primary">ACTIONS</th>
                              </tr>
                            </thead>
                            <tbody>
                              {users.filter(user => user.isAdmin === false && user.isVendor === false).map((user) => (
                                <tr key={user._id} className="border-b">
                                  <td className="p-2 text-center align-middle">{user._id.substring(20, 24)}</td>
                                  <td className="p-2 text-center align-middle">{user.name}</td>
                                  <td className="p-2 text-center align-middle">{user.email}</td>
                                  <td className="p-2 text-center align-middle">{user.isAdmin ? 'YES' : 'NO'}</td>
                                  <td className="p-2 text-center align-middle">{user.isVendor ? 'YES' : 'NO'}</td>
                                  <td className="p-2 text-center align-middle">{user.isManufacturer ? 'YES' : 'NO'}</td>
                                  <td className="p-2 text-center align-middle">
                                    <Link
                                      href={`/admin/user/${user._id}`}
                                      type="button"
                                      className="btn btn-primary"
                                    >
                                      Edit
                                    </Link>
                                    &nbsp;
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      onClick={() => deleteHandler(user._id)}
                                    >
                                      Delete
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </Row>
                      </Tab>
                      <Tab eventKey="vendor" title="Vendor">
                        <Row className="py-5 px-3">
                          <Card.Title className="fs-1 text-center text-primary">Vendor Users</Card.Title>
                          <table className="table text-white">
                            <thead className="border-b">
                              <tr>
                                <th className="p-3 text-center text-primary">ID</th>
                                <th className="p-3 text-center text-primary">NAME</th>
                                <th className="p-3 text-center text-primary">EMAIL</th>
                                <th className="p-3 text-center text-primary">ADMIN</th>
                                <th className="p-3 text-center text-primary">VENDOR</th>
                                <th className="p-3 text-center text-primary">MANUFACTURER</th>
                                <th className="p-3 text-center text-primary">ACTIONS</th>
                              </tr>
                            </thead>
                            <tbody>
                              {users.filter(user => user.isVendor === true).map((user) => (
                                <tr key={user._id} className="border-b">
                                  <td className="p-2 text-center align-middle">{user._id.substring(20, 24)}</td>
                                  <td className="p-2 text-center align-middle">{user.name}</td>
                                  <td className="p-2 text-center align-middle">{user.email}</td>
                                  <td className="p-2 text-center align-middle">{user.isAdmin ? 'YES' : 'NO'}</td>
                                  <td className="p-2 text-center align-middle">{user.isVendor ? 'YES' : 'NO'}</td>
                                  <td className="p-2 text-center align-middle">{user.isManufacturer ? 'YES' : 'NO'}</td>
                                  <td className="p-2 text-center align-middle">
                                    <Link
                                      href={`/admin/user/${user._id}`}
                                      type="button"
                                      className="btn btn-primary"
                                    >
                                      Edit
                                    </Link>
                                    &nbsp;
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      onClick={() => deleteHandler(user._id)}
                                    >
                                      Delete
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </Row>
                      </Tab>
                      <Tab eventKey="admin" title="Admin">
                        <Row className="row py-5 px-3">
                          <Card.Title className="fs-1 text-center text-primary">Admin Users</Card.Title>
                          <table className="table text-white">
                            <thead className="border-b">
                              <tr>
                                <th className="p-3 text-center text-primary">ID</th>
                                <th className="p-3 text-center text-primary">NAME</th>
                                <th className="p-3 text-center text-primary">EMAIL</th>
                                <th className="p-3 text-center text-primary">ADMIN</th>
                                <th className="p-3 text-center text-primary">VENDOR</th>
                                <th className="p-3 text-center text-primary">MANUFACTURER</th>
                                <th className="p-3 text-center text-primary">ACTIONS</th>
                              </tr>
                            </thead>
                            <tbody>
                              {users.filter(user => user.isAdmin === true).map((user) => (
                                <tr key={user._id} className="border-b">
                                  <td className="p-2 text-center align-middle">{user._id.substring(20, 24)}</td>
                                  <td className="p-2 text-center align-middle">{user.name}</td>
                                  <td className="p-2 text-center align-middle">{user.email}</td>
                                  <td className="p-2 text-center align-middle">{user.isAdmin ? 'YES' : 'NO'}</td>
                                  <td className="p-2 text-center align-middle">{user.isVendor ? 'YES' : 'NO'}</td>
                                  <td className="p-2 text-center align-middle">{user.isManufacturer ? 'YES' : 'NO'}</td>
                                  <td className="p-2 text-center align-middle">
                                    <Link
                                      href={`/admin/user/${user._id}`}
                                      type="button"
                                      className="btn btn-primary"
                                    >
                                      Edit
                                    </Link>
                                    &nbsp;
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      onClick={() => deleteHandler(user._id)}
                                    >
                                      Delete
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </Row>
                      </Tab>
                    </Tabs>
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

AdminUsers.auth = { adminOnly: true }
export default AdminUsers;