import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Image from "next/image";
// import db from '../../utils/db';
import data from '../../utils/data';
// import Product from '../../models/Product';
// import { Store } from '../../utils/Store';
// import Rating from '../../components/Rating';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { ToastContainer, toast, Slide } from "react-toastify";

const ProductDetails = (props) => {
  // const { state, dispatch } = useContext(Store);
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((x) => x.slug === slug);
  
  const [selectedImg, setSelectedImg] = useState("");
  
  if (!product) {
    return <div>Product Not Found</div>
  }

  // const addToCartHandler = async () => {
  //   const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
  //   const quantity = existItem ? existItem.quantity + 1 : 1;
  //   const { data } = await axios.get(`/api/products/${product._id}`);

  //   if (data.countInStock < quantity) {
  //     return toast.error('Sorry, this product is out of stock', {
  //       theme: "colored"
  //     });
  //   }

  //   dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  //   router.push('/cart');
  // };

  return (
    <Layout title={product?.name}>
      <ToastContainer 
        position="top-center" 
        draggable={false} 
        transition={Slide} 
        autoClose={5000}
        hideProgressBar={true}
        className="toast-alert"
      />
      <div className="details-container bg-white">

        <section>
          <div className="container-xxl">
          <Card className="shadow p-3 mb-5 bg-body rounded">
          <Card.Body>

            <div className="row gy-5">
              <div className="col p-3">
                <button onClick={() => router.back()} type="button" className="btn btn-link"><i className="bi bi-arrow-left"></i> back to products</button>
              </div>
            </div>
            <div className="row">
            <div className="col-lg-6 col-md-12 main-img">
              <div className="row">
                <div className="col-12">
                  <Image 
                      src={ selectedImg === "" ? product.imageOne : selectedImg } 
                      className="d-block w-100" 
                      width={640} 
                      height={640} 
                      alt={product.name} 
                    />
                </div>
                <div className="col-12 thumbnail-images">
                <div className="thumbnails">
                  <Image 
                    className="small" 
                    src={product.imageOne} 
                    alt="thumbnail"
                    onClick={() => setSelectedImg(product.imageOne)}
                    width={200}
                    height={200}
                  />
                </div>
                <div className="thumbnails">
                  <Image 
                    className="small" 
                    src={product.imageTwo} 
                    alt="thumbnail"
                    onClick={() => setSelectedImg(product.imageTwo)}
                    width={200}
                    height={200}
                  />
                </div>
                <div className="thumbnails">
                  <Image 
                    className="small" 
                    src={product.imageThree} 
                    alt="thumbnail"
                    onClick={() => setSelectedImg(product.imageThree)}
                    width={200}
                    height={200}
                  />
                </div>
                <div className="thumbnails">
                  <Image 
                    className="small" 
                    src={product.imageFour} 
                    alt="thumbnail"
                    onClick={() => setSelectedImg(product.imageFour)}
                    width={200}
                    height={200}
                  />
                </div>
                </div>
              </div>


              </div>
              

              <div className="col-lg-5 col-md-12 col-sm-12">
                <div className="row">
                  <div className="col-lg-12 col-md-6 col-sm-12">
                    <h2>{product.name}</h2>
                    <h3>{product.type}</h3>
                    <h5 className="fw-bold">Description</h5>
                    <p>{product.description}</p>
                    <h5 className="fw-bold">Size</h5>
                    <p>{product.priceSize[0].size}</p>
                    <p>{product.leafName}</p>
                    <h5 className="fw-bold">Disclaimer</h5>
                    <p>
                      Our products are the highest quality (GAP/GMP).  They have not been evaluated by the FDA.  Only for use as botanical specimen.  The information given is for 
                      academic purpose only and not intended to diagnose, treat, cure or prevent disease.
                    </p>
                    {/* <Rating 
                      rating={product.rating} 
                      numReviews={product.numReviews}
                    />
                    <p>{product.rating} of {product.numReviews} reviews</p> */}
                    <div className="row">
                          <div className="col-6">
                            <h5><b>Price:</b></h5>
                            <h6><b>Status:</b></h6>
                          </div>
                          <div className="col-6 text-end">
                            <h5>${product.priceSize[0].price}</h5>
                            <div className="text-mute">{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</div>
                          </div>
                        </div>
                        <div className="d-grid gap-2">
                          <button 
                            className="w-100 btn btn-lg btn-outline-primary light" 
                            type="button"
                          >
                            Add To Cart
                          </button>
                        </div>  
                  </div>
                </div>
              </div>
            </div>
            </Card.Body>
            </Card>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default ProductDetails;

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const { slug } = params;

//   await db.connect();
//   const product = await Product.findOne({slug}).lean();
//   await db.disconnect();
//   return {
//     props: {
//       product: db.convertDocToObj(product)
//     }
//   };
// }