import axios from 'axios';
import Layout from '../../../components/Layout';
import SideNav from '../../../components/SideNav';
import { useRouter } from 'next/router';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useEffect, useReducer, useState, useRef, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Image from "next/image";
import { getError } from '../../../utils/error';
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer, toast, Slide } from "react-toastify";
import Editor from '../../../components/Editor';
import parse from 'html-react-parser';
import dynamic from 'next/dynamic';
import {$getRoot, $getSelection} from 'lexical';
import {$createParagraphNode} from 'lexical';
import { LexicalComposerContext } from '@lexical/react/LexicalComposerContext';

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

const AdminBlogEdit = ({ params }) => {
    const blogId = params.id;
    const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        setValue,
      } = useForm();

    const [isPublished, setIsPublished] = useState(false);
    const [isImageOne, setIsImageOne] = useState('');

    useEffect(() => {
        const fetchData = async () => {
          try {
            dispatch({ type: 'FETCH_REQUEST' });
            const { data } = await axios.get(`/api/admin/blogs/${blogId}`);

            dispatch({ type: 'FETCH_SUCCESS' });
            setValue('title', data.title);
            setValue('slug', data.slug);
            setValue('description', data.description);
            setValue('article', data.article);
            setValue('author', data.author);
            setIsPublished(data.published);
            setValue('headerImage', data.headerImage);
            setIsImageOne(data.headerImage);
          } catch (err) {
            dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
          }
        };
    
        fetchData();
      }, [blogId, setValue]);


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
    title,
    tags,
    description,
    author,
    article,
    published = isPublished,
    headerImage,
    slug
  }) => {
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(`/api/admin/blogs/${blogId}`, {
        title,
        tags,
        description,
        author,
        article,
        published,
        headerImage,
        slug
      });
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('Blog updated successfully', {
        theme: 'colored'
      });
      router.push('/admin/blogs');
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
                    <Card.Title className="text-center text-primary fs-1">{`Edit Category ${blogId}`}</Card.Title>
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
                              id="title"
                              placeholder="Title" 
                              {...register('title', {
                                required: 'Please enter blog title',
                              })}
                            />
                            {errors.title && (
                              <div className="invalid-feedback">
                                {errors.title.message}
                              </div>
                            )}
                            <label htmlFor="title">Title</label>
                          </div>
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              id="slug"
                              placeholder="Slug"
                              {...register('slug', {
                                required: 'Please enter slug',
                              })}
                            />
                            {errors.slug && (
                              <div className="invalid-feedback">{errors.slug.message}</div>
                            )}
                            <label htmlFor="slug">Slug</label>
                          </div>
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              id="author"
                              placeholder="Author"
                              {...register('author', {
                                required: 'Please enter an author',
                              })}
                            />
                            {errors.author && (
                              <div className="invalid-feedback">{errors.author.message}</div>
                            )}
                            <label htmlFor="author">Author</label>
                          </div>
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              id="description"
                              placeholder="Description"
                              {...register('description', {
                                required: 'Please enter an description',
                              })}
                            />
                            {errors.author && (
                              <div className="invalid-feedback">{errors.description.message}</div>
                            )}
                            <label htmlFor="description">Description</label>
                          </div>
                          {isImageOne && ( <Image src={isImageOne} width={150} height={90} alt="Product Image One" /> )}
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              id="headerImage"
                              placeholder="Blog Header Image" 
                              {...register('headerImage', {
                                required: 'Please upload a blog header image',
                              })}
                            />
                            {errors.headerImage && (
                              <div className="invalid-feedback">{errors.headerImage.message}</div>
                            )}
                            <label htmlFor="headerImage">Blog Header Image</label>
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
                          <Controller
                            control={control}
                            name="article"
                            render={({ field: fieldContent }) => (
                              <Controller
                                control={control}
                                name="article"
                                render={({ field }) => (
                                  <Editor
                                    onChange={value => {
                                      field.onChange(value.editorState)
                                      fieldContent.onChange(value.content)
                                    }}
                                    value={field.value}
                                  />
                                )}
                              />
                            )}
                          />
                          </div>
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              id="tags"
                              placeholder="Tags"
                              {...register('tags')}
                            />
                            <label htmlFor="tags">Tags</label>
                          </div>  
                          <div className="form-check my-3">
                            <input 
                              className="form-check-input" 
                              type="checkbox" 
                              onChange={(e) => setIsPublished(e.target.checked)}
                              checked={isPublished}
                              name="published"
                              id="published"
                            />
                            <label className="form-check-label" htmlFor="published">
                              Publish
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
                            "Edit Blog Post"
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
  
AdminBlogEdit.auth = { adminOnly: true }
export default AdminBlogEdit;