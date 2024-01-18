import axios from 'axios';
import Layout from '../../../components/Layout';
import SideNav from '../../../components/SideNav';
import { useRouter } from 'next/router';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useEffect, useReducer, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getError } from '../../../utils/error';
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer, toast, Slide } from "react-toastify";

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true, errorUpdate: '' };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false, errorUpdate: '' };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };

    default:
      return state;
  }
}

const AdminUserEdit = ({ params }) => {
  const userId = params.id;

  const [{ loading, error, loadingUpdate }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  let [isAdminChecked, setIsAdminChecked] = useState(false);
  let [isVendorChecked, setIsVendorChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/users/${userId}`);
        dispatch({ type: 'FETCH_SUCCESS' });
        setValue('name', data.name);
        setValue('email', data.email);
        setValue('phone', data.phone);
        setValue('birthDate', data.birthDate);
        setValue('companyName', data.companyName);
        setValue('streetName', data.streetName);
        setValue('city', data.city);
        setValue('province', data.province);
        setValue('postalCode', data.postalCode);
        setValue('country', data.country);
        setIsAdminChecked(data.isAdmin);
        setIsVendorChecked(data.isVendor);
        setValue('password', data.password)
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [userId, setValue]);
    
  const submitHandler = async ({
    name,
    email,
    phone,
    birthDate,
    companyName,
    streetName,
    city,
    province,
    postalCode,
    country,
    isAdmin = isAdminChecked,
    isVendor = isVendorChecked,
    password
  }) => {
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(`/api/admin/users/${userId}`, {
      name,
      email,
      phone,
      birthDate,
      companyName,
      streetName,
      city,
      province,
      postalCode,
      country,
      isAdmin,
      isVendor,
      password
    });
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('User updated successfully'), {
        theme: "colored"
      };
      router.push('/admin/users');
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
      toast.error(getError(err), {
        theme: "colored"
      });
    }
  };

  return (
    <Layout title="Admin Products">
      <ToastContainer 
        position="top-center" 
        draggable={false} 
        transition={Slide} 
        autoClose={3000}
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
              <Card className="card admin-card-container p-4">
                <Card.Body>
                  <Row className="gx-5">
                    <Card.Title className="text-center text-primary fs-1">{`Edit User ${userId}`}</Card.Title>
                    {loading ? (
                      <div className="spinner-border customer-spinner text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>   
                    ) : error ? (
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>          
                    ) : (
                      <form onSubmit={handleSubmit(submitHandler)} className="col-lg-12 col-md-12 col-sm-12 form-shipment justify-content-center">
                        <Row>
                        <Col lg={12}>
                          <div className="form-floating">
                            <input
                              type="text"
                              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                              placeholder="Full Name" 
                              {...register('name', {
                                required: 'Please enter name',
                              })}
                            />
                            {errors.name && (
                              <div className="invalid-feedback">
                                {errors.name.message}
                              </div>
                            )}
                            <label htmlFor="name">Full Name</label>
                          </div>
                          <div className="form-floating">
                            <input
                              type="email"
                              {...register('email', {
                                required: 'Please enter email',
                                pattern: {
                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                                message: 'Please enter valid email',
                                },
                              })}
                              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                              placeholder="Email"
                            />
                            {errors.email && (
                              <div className="invalid-feedback">
                                {errors.email.message}
                              </div>
                            )}
                            <label htmlFor="name">Email</label>
                          </div>
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Phone Number" 
                              {...register('phone')}
                            />
                            <label htmlFor="phone">Phone Number</label>
                          </div>
                      
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Birth Date" 
                              {...register('birthDate')}
                            />
                            <label htmlFor="birthDate">Birth Date</label>
                          </div>
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control" 
                              placeholder="Company Name" 
                              {...register('companyName')}
                            />
                            <label htmlFor="companyName">Company Name</label>
                          </div>
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Street Name" 
                              {...register('streetName')}
                            />
                            <label htmlFor="streetName">Street Name</label>
                          </div>
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="City" 
                              {...register('city')}
                            />
                            <label htmlFor="city">City</label>
                          </div>
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Province / State" 
                              id="province"
                              {...register('province')}
                            />
                            <label htmlFor="province">Province / State</label>
                          </div>
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control zip-code"
                              placeholder="Postal Code" 
                              id="postalCode"
                              {...register('postalCode')}
                            />
                            <label htmlFor="postalCode">Postal Code</label>
                          </div>
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Country" 
                              id="country"
                              {...register('country')}
                            />
                            <label htmlFor="country">Country</label>
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="form-check my-3">
                            <input 
                              className="form-check-input vendor-checkbox" 
                              type="checkbox" 
                              onChange={(e) => {setIsVendorChecked(e.target.checked)}}
                              checked={isVendorChecked}
                              name="isVendor"
                              id="isVendor"
                              disabled={!isVendorChecked && isAdminChecked}
                            />
                            <label className="form-check-label" htmlFor="gridCheck">
                              Retail Vendor
                            </label>
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="form-check float-end my-3">
                            <input 
                              className="form-check-input admin-checkbox" 
                              type="checkbox" 
                              onChange={(e) => setIsAdminChecked(e.target.checked)}
                              checked={isAdminChecked}
                              name="isAdmin"
                              id="isAdmin"
                              disabled={!isAdminChecked && isVendorChecked}
                            />
                            <label className="form-check-label" htmlFor="gridCheck">
                              Admin
                            </label>
                          </div> 
                        </Col>
                        <button className="w-100 btn btn-lg btn-primary my-4" type="submit">
                          {loadingUpdate ? (
                            <Spinner
                              as="span"
                              animation="grow"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                          ) : (
                            "Edit Category"
                          )}
                         </button>
                        </Row>
                      </form>
                    )}
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  return {
    props: { params },
  };
}

AdminUserEdit.auth = { adminOnly: true }
export default AdminUserEdit;