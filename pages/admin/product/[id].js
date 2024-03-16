import axios from 'axios';
import Layout from '../../../components/Layout';
import SideNav from '../../../components/SideNav';
import { useRouter } from 'next/router';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useEffect, useReducer, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
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

const AdminProductEdit = ({ params }) => {
  const productId = params.id;

  const [{ 
    loading, 
    error, 
    loadingUpdate, 
    loadingFeaturedImage,
    loadingImageOne, 
    loadingImageTwo, 
    loadingImageThree, 
    loadingImageFour 
  }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });
  
  const { register, control, handleSubmit, formState: { errors }, setValue, setFormData } = useForm({
    defaultValues: {
      priceSizes: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'priceSizes',
  });

  // Set Featured Check and Set Images
  const [isFeatured, setIsFeatured] = useState(false);
  const [isImageOne, setIsImageOne] = useState('');
  const [isImageTwo, setIsImageTwo] = useState('');
  const [isImageThree, setIsImageThree] = useState('');
  const [isImageFour, setIsImageFour] = useState('');
  const [isFeaturedImage, setIsFeaturedImage] = useState('');

    
  useEffect(() => {
    const fetchData = async () => {
        try {
          dispatch({ type: 'FETCH_REQUEST' });
          const { data } = await axios.get(`/api/admin/products/${productId}`);
          dispatch({ type: 'FETCH_SUCCESS' });
          data.priceSizes.map((priceSize, index) => {
            setValue(`priceSizes.${index}.packSize`, data.priceSizes[index].packSize)
            setValue(`priceSizes.${index}.price`, data.priceSizes[index].price)
            setValue(`priceSizes.${index}.countInStock`, data.priceSizes[index].countInStock)
          })
          setValue('name', data.name);
          setValue('slug', data.slug);
          setValue('flavor', data.flavor);
          setValue('category', data.category);
          setValue('color', data.color);
          setValue('imageOne', data.imageOne);
          setValue('imageTwo', data.imageTwo);
          setValue('imageThree', data.imageThree);
          setValue('imageFour', data.imageFour);
          setValue('category', data.category);
          setValue('size', data.size);
          setValue('imageOne', data.imageOne);
          setValue('imageTwo', data.imageTwo);
          setValue('imageThree', data.imageThree);
          setValue('imageFour', data.imageFour);
          setValue('featuredImage', data.featuredImage);
          setValue('description', data.description);
          setIsFeatured(data.featured);
          setIsImageOne(data.imageOne);
          setIsImageTwo(data.imageTwo);
          setIsImageThree(data.imageThree);
          setIsImageFour(data.imageFour);
          setIsFeaturedImage(data.featuredImage);

          // Dynamically set priceSizes
          setValue('priceSizes', data.priceSizes.map(priceSize => ({
            packSize: priceSize.packSize,
            price: priceSize.price,
            countInStock: priceSize.countInStock,
          })));
        } catch (err) {
          dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
        }
      };
  
      fetchData();
  }, [productId, setValue]);

  const router = useRouter();

  const uploadFeatureHandler = async (e, imageFeatured = 'featuredImage') => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/upload`;
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
      setValue(imageFeatured, data.secure_url);

      toast.success('File uploaded successfully', {
        theme: 'colored'
      });
    } catch (err) {
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
      toast.error(getError(err), {
        theme: 'colored'
      });
    }
  };
  
  const uploadHandler = async (e, imageFieldOne = 'imageOne') => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/upload`;
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

      toast.success('File uploaded successfully', {
        theme: 'colored'
      });
    } catch (err) {
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
      toast.error(getError(err), {
        theme: 'colored'
      });
    }
  };

  const uploadImageTwoHandler = async (e, imageFieldTwo = 'imageTwo') => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/upload`;
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
      setValue(imageFieldTwo, data.secure_url);

      toast.success('File uploaded successfully', {
        theme: 'colored'
      });
    } catch (err) {
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
      toast.error(getError(err), {
        theme: 'colored'
      });
    }
  };

  const uploadImageThreeHandler = async (e, imageFieldThree = 'imageThree') => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/upload`;
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
      setValue(imageFieldThree, data.secure_url);

      toast.success('File uploaded successfully', {
        theme: 'colored'
      });
    } catch (err) {
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
      toast.error(getError(err), {
        theme: 'colored'
      });
    }
  };

  const uploadImageFourHandler = async (e, imageFieldFour = 'imageFour') => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/upload`;
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
      setValue(imageFieldFour, data.secure_url);

      toast.success('File uploaded successfully', {
        theme: 'colored'
      });
    } catch (err) {
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
      toast.error(getError(err), {
        theme: 'colored'
      });
    }
  };

  const submitHandler = async ({
    name,
    flavor,
    slug,
    category,
    imageOne,
    imageTwo,
    imageThree,
    imageFour,
    size,
    color,
    priceSizes,
    description,
    featuredImage,
    featured = isFeatured
  }) => {
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(`/api/admin/products/${productId}`, {
        name,
        flavor,
        slug,
        category,
        imageOne,
        imageTwo,
        imageThree,
        imageFour,
        size,
        color,
        priceSizes,
        description,
        featuredImage,
        featured
      });
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('Product updated successfully', {
        theme: 'colored'
      });
      router.push('/admin/products');
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
                    <Card.Title className="text-center text-primary fs-1">{`Edit Product ${productId}`}</Card.Title>
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
                          <Col lg={6}>
                            <button 
                              type="button" 
                              className="btn btn-primary" 
                              onClick={() => append({ 
                                packSize: '', 
                                price: '',
                                countInStock: ''
                              })}
                            >
                              Add Package and Price
                            </button>
                            {fields.map((field, index) => {
                              return (
                                <Card className="my-3" key={field.id}>
                                  <Card.Body>
                                    <h4>Package and Price Details {index + 1}</h4>
                                    {['packSize', 'price', 'countInStock'].map(fieldName => (
                                      <div className="form-floating" key={fieldName}>
                                        <input
                                          type="text"
                                          name={fieldName}
                                          className={`form-control ${errors[fieldName] ? 'is-invalid' : ''}`}
                                          id={fieldName}
                                          placeholder={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                                          {...register(`priceSizes.${index}.${fieldName}`, {
                                            required: `Please enter ${fieldName}`,
                                          })}
                                        />
                                        {errors[fieldName] && (
                                          <div className="invalid-feedback">
                                            {errors[fieldName].message}
                                          </div>
                                        )}
                                        <label htmlFor={fieldName}>{fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}</label>
                                      </div>
                                    ))}
                                    <button 
                                      type="button" 
                                      className="btn btn-danger"
                                      onClick={() => remove(index)}
                                    >
                                      Remove
                                    </button>
                                  </Card.Body>
                                </Card>
                              )
                            })
                          }
                          {isFeaturedImage && ( <Image src={isFeaturedImage} width={100} height={100} alt="Featured Product Image" /> )}
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              id="featuredImage"
                              {...register('featuredImage', {
                                required: 'Please enter image',
                              })}
                            />
                            {errors.featuredImage && (
                              <div className="invalid-feedback">{errors.featuredImage.message}</div>
                            )}
                            <label htmlFor="featuredImage">Featured Image</label>
                            <div className="file btn btn-lg btn-primary">
                              Upload Image
                              <input 
                                type="file" 
                                id="ImageFeatured"
                                onChange={uploadFeatureHandler}
                              />
                              {loadingFeaturedImage && <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />}
                            </div>
                          </div>
                          <div className="form-check my-3">
                            <input 
                              className="form-check-input" 
                              type="checkbox" 
                              onChange={(e) => {setIsFeatured(e.target.checked)}}
                              checked={isFeatured}
                              name="featured"
                              id="featured"
                            />
                            <label className="form-check-label" htmlFor="featured">
                              Featured
                            </label>
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              id="name"
                              placeholder="Name" 
                              {...register('name', {
                                required: 'Please enter name',
                              })}
                            />
                            {errors.name && (
                              <div className="invalid-feedback">
                                {errors.name.message}
                              </div>
                            )}
                            <label htmlFor="name">Name</label>
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
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              id="flavor"
                              placeholder="Flavor"
                              {...register('flavor', {
                                required: 'Please enter flavor',
                              })}
                            />
                            {errors.flavor && (
                              <div className="invalid-feedback">
                                {errors.flavor.message}
                              </div>
                            )}
                            <label htmlFor="flavor">Flavor</label>
                          </div>
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              id="category"
                              placeholder="Category" 
                              {...register('category', {
                                required: 'Please enter category',
                              })}
                            />
                            {errors.category && (
                              <div className="invalid-feedback">{errors.category.message}</div>
                            )}
                            <label htmlFor="slug">Category</label>
                          </div>
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              id="color"
                              placeholder="Color"
                              {...register('color')}
                            />
                            <label htmlFor="color">Color</label>
                          </div>
                          <div className="form-floating">
                            <textarea
                              row="5"
                              className="form-control"
                              id="description"
                              {...register('description', {
                                required: 'Please enter description',
                              })}
                            />
                            {errors.description && (
                              <div className="invalid-feedback">
                                {errors.description.message}
                              </div>
                            )}
                            <label htmlFor="description">Description</label>
                          </div>
                          {isImageOne && ( <Image src={isImageOne} width={125} height={90} alt="Product Image One" /> )}
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              id="imageOne"
                              placeholder="Image One" 
                              {...register('imageOne', {
                                required: 'Please enter image',
                              })}
                            />
                            {errors.imageOne && (
                              <div className="invalid-feedback">{errors.imageOne.message}</div>
                            )}
                            <label htmlFor="imageOne">Image One</label>
                            <div className="file btn btn-lg btn-primary">
                              Upload Image
                              <input 
                                type="file" 
                                id="imageFile"
                                onChange={uploadHandler}
                              />
                              {loadingImageOne && <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />}
                            </div>
                          </div>
                          {isImageTwo && ( <Image src={isImageTwo} width={125} height={90} alt="Product Image Two" /> )}
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              id="imageTwo"
                              placeholder="Image Two" 
                              {...register('imageTwo', {
                                required: 'Please enter image',
                              })}
                            />
                            {errors.imageTwo && (
                              <div className="invalid-feedback">{errors.imageTwo.message}</div>
                            )}
                            <label htmlFor="imageTwo">Image Two</label>
                            <div className="file btn btn-lg btn-primary">
                              Upload Image
                              <input 
                                type="file" 
                                id="imageFileTwo"
                                onChange={uploadImageTwoHandler}
                              />
                            </div>
                            {loadingImageTwo && <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />}
                          </div>
                          {isImageThree && ( <Image src={isImageThree} width={125} height={90} alt="Product Image Three" /> )}
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              id="imageThree"
                              placeholder="Image Three" 
                              {...register('imageThree', {
                                required: 'Please enter image',
                              })}
                            />
                            {errors.imageThree && (
                              <div className="invalid-feedback">{errors.imageThree.message}</div>
                            )}
                            <label htmlFor="imageThree">Image Three</label>
                            <div className="file btn btn-lg btn-primary">
                              Upload Image
                              <input 
                                type="file" 
                                id="imageFileThree"
                                onChange={uploadImageThreeHandler}
                              />
                            </div>
                            {loadingImageThree && <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />}
                          </div>
                          {isImageFour && ( <Image src={isImageFour} width={125} height={90} alt="Product Image Four" /> )}
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              id="imageFour"
                              placeholder="Image Four" 
                              {...register('imageFour', {
                                required: 'Please enter image',
                              })}
                            />
                            {errors.imageFour && (
                              <div className="invalid-feedback">{errors.imageFour.message}</div>
                            )}
                            <label htmlFor="imageFour">Image Four</label>
                            <div className="file btn btn-lg btn-primary">
                              Upload Image
                              <input 
                                type="file" 
                                id="imageFileFour"
                                onChange={uploadImageFourHandler}
                              />
                              {loadingImageFour && <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />}
                            </div>
                          </div>
                        </Col>
                        <button className="w-100 btn btn-lg btn-primary" type="submit">
                          {loadingUpdate ? (
                            <Spinner
                              as="span"
                              animation="grow"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                          ) : (
                            "Edit Product"
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

AdminProductEdit.auth = { adminOnly: true }
export default AdminProductEdit;