import Image from "next/image";
import Layout from '../components/Layout';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useContext } from 'react';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { ToastContainer, toast, Slide } from "react-toastify";

const Cart = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const updateCartHandler = (item, qty) => {
    const quantity = Number(qty);
  
    if (quantity <= 0) {
      return toast.error('Quantity must be greater than zero', {
        theme: 'colored',
      });
    }
  
    const selectedSize = item.priceSizes.find((packSizeSelected) => packSizeSelected.packSize === item.packSizeSelected);
  
    if (quantity > selectedSize.countInStock) {
      return toast.error('Sorry. Product is out of stock', {
        theme: 'colored',
      });
    }
  
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity: quantity - item.quantity }, // Adjust quantity based on the difference
    });
  
    toast.success('Product updated in the cart', {
      theme: 'colored',
    });
  };

  return (
    <Layout title="No Booze Beverages | Product Cart">
      <ToastContainer 
        position="top-center" 
        draggable={false} 
        transition={Slide} 
        autoClose={5000}
        hideProgressBar={true}
        className="toast-alert"
      />
      <div className="cart-container page-contain bg-white py-5">
        <Container fluid className="pt-5">
          <Row className="text-center my-3">
            <h1>Shopping Cart</h1>
          </Row>
          {cartItems.length === 0 ? (
            <div className="empty-cart text-center">
              <h2 className="text-white">Shopping Cart is Empty</h2>
              <Link href="/products">
                <button type="button" className="btn btn-link">Go make an order <i className="bi bi-arrow-right"></i></button>
              </Link>
            </div>
          ) : (
            <Row>
              <Col lg={9} className="cart">
                {cartItems.map((item) => (
                  <Card className="mb-2" key={`${item._id}-${item.packSizeSelected}`}>
                    <Card.Body>
                      <div className="cart-row d-flex justify-content-between align-items-center">
                        <div className="product-img">
                          <Image src={item.imageOne} className="d-block w-100" width={100} height={100} alt="..." />
                        </div>
                        <div className="product-name d-flex align-items-center">
                          <p className="text-center">
                            {item.name}<br />
                            {item.flavor}
                          </p>
                        </div>

                        <div className="product-siz d-flex align-items-center">
                          <p className="text-center">
                            {item.packSizeSelected}
                          </p>
                        </div>

                        <div className="quantity-select text-center">
                          <span>Quantity</span>
                          <select
                            className="form-select"
                            value={item.quantity}
                            onChange={(e) => updateCartHandler(item, e.target.value)}
                          >
                            {[...Array(item.priceSizes.find((packSizeSelected) => packSizeSelected.packSize === item.packSizeSelected).countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="price d-flex align-items-center">
                          <p>${item.price}</p>
                        </div>
                        <div className="cart-remove-btn">
                          <button 
                            type="button" 
                            className="btn btn-outline-primary"
                            onClick={() => removeItemHandler(item)}
                          >
                            X
                          </button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </Col>
              <Col lg={3}>
                <Card>
                  <Card.Body>
                    <Row className="row py-5">
                      <Col md={6} sm={6}>
                        <h5>
                          <b>Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) :</b>
                        </h5>
                      </Col>
                      <Col md={6} sm={6} className="text-end">
                        <h5>
                          ${cartItems.reduce((a, c) => a + c.quantity * c.price, 0).toFixed(2)}
                        </h5>
                      </Col>
                    </Row>
                    <div className="d-grid gap-2">
                      <button 
                        className="w-100 btn btn-lg btn-outline-primary light"  
                        type="button"
                        onClick={() => router.push('/shipping')}
                      >
                        Check Out
                      </button>
                    </div>                  
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Cart), { ssr: false });