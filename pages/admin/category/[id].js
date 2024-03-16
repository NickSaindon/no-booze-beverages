import axios from 'axios';
import Layout from '../../../components/Layout';
import SideNav from '../../../components/SideNav';
import { useRouter } from 'next/router';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useEffect, useReducer, useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from "next/image";
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
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
}

const AdminCategoryEdit = ({ params }) => {
  const categoryId = params.id;

  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [isImageOne, setIsImageOne] = useState('');


  useEffect(() => {
    const fetchData = async () => {
        try {
          dispatch({ type: 'FETCH_REQUEST' });
          const { data } = await axios.get(`/api/admin/categories/${categoryId}`);
          dispatch({ type: 'FETCH_SUCCESS' });
          setValue('name', data.name);
          setValue('slug', data.slug);
          setValue('categoryImage', data.categoryImage);
          setValue('categoryText', data.categoryText);
          setIsImageOne(data.categoryImage);
        } catch (err) {
          dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
        }
      };
  
      fetchData();
  }, [categoryId, setValue]);

  const router = useRouter();
  
  const uploadHandler = async (e, imageFieldOne = 'imageOne') => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const {
        data: { signature, timestamp },
      } = await axios('/api/admin/cloudinary-sign');

      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp);
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
      const { data } = await axios.post(url, formData);
      dispatch({ type: 'UPLOAD_SUCCESS' });
      setValue(imageFieldOne, data.secure_url);

      toast.success('File uploaded successfully');
    } catch (err) {
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
      toast.error(getError(err), {
        theme: 'colored'
      });
    }
  };

  
  const submitHandler = async ({
    name,
    slug,
    categoryImage,
    categoryText,

  }) => {
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(`/api/admin/categories/${categoryId}`, {
        name,
        slug,
        categoryImage,
        categoryText,

      });
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('Category updated successfully', {
        theme: 'colored'
      });
      router.push('/admin/categories');
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
      toast.error(getError(err), {
        theme: 'colored'
      });
    }
  };

  return (
    <Layout title="Admin Products">
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
              <Card className="card admin-card-container p-4">
                <Card.Body>
                  <Row className="gx-5">
                    <Card.Title className="text-center text-primary fs-1">{`Edit Category ${categoryId}`}</Card.Title>
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
                              className="form-control"
                              id="name"
                              placeholder="Category Name" 
                              {...register('name', {
                                required: 'Please enter category name',
                              })}
                            />
                            {errors.name && (
                              <div className="invalid-feedback">
                                {errors.name.message}
                              </div>
                            )}
                            <label htmlFor="name">Category Name</label>
                          </div>
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              id="slug"
                              {...register('slug', {
                                required: 'Please enter slug',
                              })}
                            />
                            {errors.slug && (
                              <div className="invalid-feedback">{errors.slug.message}</div>
                            )}
                            <label htmlFor="slug">Slug</label>
                          </div>
                          {isImageOne && ( <Image src={isImageOne} width={192} height={90} alt="Product Image One" /> )}
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              id="categoryImage"
                              placeholder="Category Image" 
                              {...register('categoryImage', {
                                required: 'Please upload a category image',
                              })}
                            />
                            {errors.imageOne && (
                              <div className="invalid-feedback">{errors.imageOne.message}</div>
                            )}
                            <label htmlFor="categoryImage">Category Image</label>
                            <div className="file btn btn-lg btn-primary">
                              Upload Image
                              <input 
                                type="file" 
                                id="imageFile"
                              />
                              {loadingUpload && <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />}
                            </div>
                          </div>
                          <div className="form-floating">
                            <textarea
                              row="5"
                              className="form-control"
                              id="categoryText"
                              placeholder="Category Description"
                              {...register('categoryText', {
                                required: 'Please enter description',
                              })}
                            />
                            {errors.categoryText && (
                              <div className="invalid-feedback">
                                {errors.categoryText.message}
                              </div>
                            )}
                            <label htmlFor="categoryText">Category Description</label>
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

AdminCategoryEdit.auth = { adminOnly: true }
export default AdminCategoryEdit;