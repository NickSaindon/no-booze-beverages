import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import Image from "next/image";
import db from '../../../utils/db';
import Product from '../../../models/Product';
import { Store } from '../../../utils/Store';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { ToastContainer, toast, Slide } from "react-toastify";

const ProductDetails = (props) => {
  const { product } = props;
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const [selectedImg, setSelectedImg] = useState("");
  const [selectedPackSize, setSelectedPackSize] = useState(product.priceSizes[0].packSize);

  if (!product) {
    return <Layout title="Produt Not Found">Produt Not Found</Layout>;
  }

  const addToCartHandler = async () => {
    const selectedSize = product.priceSizes.find((sizeSelected) => sizeSelected.packSize === selectedPackSize);
    const existItem = state.cart.cartItems.find(
      (x) => x.slug === product.slug && x.sizeSelected === selectedSize.packSize
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (selectedSize.countInStock < quantity) {
      return toast.error('Sorry, this product is out of stock', {
        theme: 'colored',
      });
    }

    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity, sizeSelected: selectedSize.packSize, price: selectedSize.price },
    });

    toast.success('Product Added to Cart', {
        theme: 'colored',
    })
  };

  const handlePackSizeChange = (e) => {
    const newSize = e.target.value;
    setSelectedPackSize(newSize);
  };

  return (
    <Layout title={product?.name}>
      <ToastContainer 
        position="top-center" 
        draggable={false} 
        transition={Slide} 
        autoClose={2000}
        hideProgressBar={true}
        className="toast-alert"
      />
      <div className="details-container page-conatin bg-white">
        <section>
          <Container fluid="xxl">
            <Card className="shadow p-3 mb-5 bg-body rounded">
              <Card.Body>
                <div className="row gy-5">
                  <div className="col p-3">
                    <button onClick={() => router.back()} type="button" className="btn btn-link"><i className="bi bi-arrow-left"></i> back to products</button>
                  </div>
                </div>
                <Row>
                  <Col lg={6} md={12} className="main-img">
                    <Row>
                      <Col lg={12}>
                        <Image 
                          src={ selectedImg === "" ? product.imageOne : selectedImg } 
                          className="d-block w-100" 
                          width={640} 
                          height={640} 
                          alt={product.name} 
                        />
                      </Col>
                      <Col className="thumbnail-images">
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
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={6} md={12} sm={12}>
                    <Row>
                      <Col lg={12} md={6} sm={12}>
                        <h2>{product.name}</h2>
                        <h3>{product.type}</h3>
                        <h5 className="fw-bold">Description</h5>
                        <p>{product.description}</p>
                        <Row className="my-4">
                          <Col lg={12}>
                            <h6><b>Size:</b></h6>
                            <div className="form-group">
                              <select
                                id="packSize"
                                className="form-control mb-3"
                                value={selectedPackSize}
                                onChange={handlePackSizeChange}
                              >
                                {product.priceSizes.map((sizeSelected) => (
                                  <option key={sizeSelected.packSize} value={sizeSelected.packSize}>
                                    {sizeSelected.packSize}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </Col>
                          <Col md={6}>
                            <h5><b>Price:</b></h5>
                            <h6><b>Status:</b></h6>
                          </Col>
                          <Col md={6} className="text-end">
                            <h5>${selectedPackSize ? product.priceSizes.find((sizeSelected) => sizeSelected.packSize === selectedPackSize).price.toFixed(2) : ''}</h5>
                            <div className={`stock-count fw-bold ${product.priceSizes.find((sizeSelected) => sizeSelected.packSize === selectedPackSize).countInStock > 0 ? 'text-primary' : 'text-danger'}`}>
                                <span><div className={`${product.priceSizes.find((sizeSelected) => sizeSelected.packSize === selectedPackSize).countInStock > 0 ? 'pulsating-circle-green' : 'pulsating-circle-red'}`}></div>                               

                                {selectedPackSize ? product.priceSizes.find((sizeSelected) => sizeSelected.packSize === selectedPackSize).countInStock > 0 ? 'In Stock' : 'Out of Stock' : ''}
                                </span>
                            </div>
                          </Col>
                        </Row>
                        <div className="d-grid gap-2">
                          <button 
                            className="w-100 btn btn-lg btn-outline-primary" 
                            type="button"
                            onClick={addToCartHandler}
                          >
                            Add To Cart
                          </button>
                        </div>  
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Container>
        </section>
      </div>
    </Layout>
  )
}

export default ProductDetails;

export async function getServerSideProps(context) {
    const { params } = context;
    const { categorySlug, productSlug } = params;
  
    await db.connect();
    const product = await Product.findOne({slug: productSlug, category: categorySlug}).lean();
    await db.disconnect();
    return {
      props: {
        product: JSON.parse(JSON.stringify(product))
      }
    };
  }