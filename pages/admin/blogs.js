import axios from 'axios';
import Layout from '../../components/Layout';
import SideNav from '../../components/SideNav';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { useEffect, useReducer } from 'react';
import { getError } from '../../utils/error';
import { ToastContainer, toast, Slide } from "react-toastify";
import moment from 'moment';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, blogs: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreate: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true };
    case 'DELETE_SUCCESS':
      return { ...state, loadingDelete: false, successDelete: true };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
    state;
  }
}

const AdminCategories = () => {
  const router = useRouter();

  const [
    { loading, error, blogs, loadingCreate, successDelete, loadingDelete },
      dispatch,
  ] = useReducer(reducer, {
      loading: true,
      categories: [],
      error: '',
    });
  
  const createHandler = async () => {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const { data } = await axios.post(`/api/admin/blogs`);
      dispatch({ type: 'CREATE_SUCCESS' });
      toast.success('Blog created successfully', {
        theme: 'colored'
      });
      router.push(`/admin/blog/${data.blogs._id}`);
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      toast.error(getError(err), {
        theme: 'colored'
      });
    }
  };
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/blogs`);
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

  const deleteHandler = async (blogId) => {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    try {
      dispatch({ type: 'DELETE_REQUEST' });
      await axios.delete(`/api/admin/blogs/${blogId}`);
      dispatch({ type: 'DELETE_SUCCESS' });
      toast.success('Category deleted successfully', {
        theme: 'colored'
      });
    } catch (err) {
      dispatch({ type: 'DELETE_FAIL' });
      toast.error(getError(err), {
        theme: 'colored'
      });
    }
  };

  return (
    <Layout title="Admin Categories">
      <ToastContainer 
        position="top-center" 
        draggable={false} 
        transition={Slide} 
        autoClose={5000}
        hideProgressBar={true}
        className="toast-alert"
      />
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
                    <Row className="py-3">
                        <Col md={{ span: 4, offset: 8 }}>
                        <button 
                        className="btn btn-lg btn-outline-primary float-end" 
                        type="submit"
                        onClick={createHandler}
                        >
                        {loadingCreate ? (
                            <>
                            <span className="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"></span>
                            <span className="visually-hidden">Loading...</span>
                            </>
                        ) : (
                            "Create Blog"
                        )}
                        </button>
                        </Col>

                    </Row>

                    <Row className="gx-5">
                      <Card.Title className="text-center text-primary fs-1">Blogs</Card.Title>
                      <Table responsive="xl" striped bordered hover>
                        <thead className="border-b">
                          <tr>
                            <th className="p-3 text-center text-primary">ID</th>
                            <th className="p-3 text-center text-primary">TITLE</th>
                            <th className="p-3 text-center text-primary">DATE</th>
                            <th className="p-3 text-center text-primary">AUTHOR</th>
                            <th className="p-3 text-center text-primary">PUBLISHED</th>
                            <th className="p-3 text-center text-primary">ACTIONS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {blogs.map((blog) => (
                            <tr key={blog._id} className="border-b">
                              <td className="p-2 text-center align-middle">{blog._id.substring(20, 24)}</td>
                              <td className="p-2 text-center align-middle">{blog.title}</td>
                              <td className="p-2 text-center align-middle">{moment(blog.createdAt).format('MM/DD/YYYY')}</td>
                              <td className="p-2 text-center align-middle">{blog.author}</td>
                              <td className="p-2 text-center align-middle">{blog.published ? 'Yes' : 'No'}</td>
                              <td className="p-2 text-center align-middle">
                                <Link
                                  href={`/admin/blog/${blog._id}`}
                                  type="button"
                                  className="btn btn-primary"
                                >
                                  Edit
                                </Link>
                                &nbsp;
                                <button 
                                  onClick={() => deleteHandler(blog._id)}
                                  type="button" 
                                  className="btn btn-danger"
                                >
                                  Delete
                                </button>
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

AdminCategories.auth = { adminOnly: true }
export default AdminCategories;