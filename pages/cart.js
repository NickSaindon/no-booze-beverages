import Image from "next/image";
import Layout from '../components/Layout';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useContext } from 'react';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import axios from 'axios';
import { ToastContainer, toast, Slide } from "react-toastify";

const Cart = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart: { cartItems }} = state;

  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const updateCartHandler = async (item, qty) => {
    const quantity = Number(qty);
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
    toast.success('Product updated in the cart');
  };

  return (
    <Layout title="No Booze Beverages | Product Cart">
      <div className="cart-container bg-white">
        <div className="container-fluid">
          <div className="row text-center">
            <h1 className="text-white">Shopping Cart</h1>
          </div>
          {cartItems.length === 0 ? (
            <div className="empty-cart text-center">
              <h2 className="text-white">Shopping Cart is Empty</h2>
              <Link href="/products" passHref>
                <button type="button" className="btn btn-link">Go make an order <i className="bi bi-arrow-right"></i></button>
              </Link>
            </div>
          ) : (
            <div className="row">
              <div className="col-lg-9 cart">
                {cartItems.map((item) => (
                  <div className="card" key={item.slug}>
                    <div className="card-body">
                      <div className="cart-row d-flex justify-content-between align-items-center">
                        <div className="product-img">
                          <Image src={item.imageOne} className="d-block w-100" width={50} height={50} alt="..." />
                        </div>
                        <div className="product-name d-flex align-items-center">
                          <p className="text-center">
                            {item.name}
                          </p>
                        </div>
                        <div className="product-siz d-flex align-items-center">
                          <p className="text-center">
                            {item.size}
                          </p>
                        </div>
                        <div className="quantity-select text-center">
                          <span>Quantity</span>
                          <select 
                            className="form-select" 
                            value={item.quantity}
                            onChange={(e) =>
                              updateCartHandler(item, e.target.value)
                            }
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
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
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-lg-3">
                <div className="card checkout-card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-6">
                        <h5>
                          <b>Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) :</b>
                        </h5>
                      </div>
                      <div className="col-6 text-end">
                        <h5 className="text-white">
                          ${cartItems.reduce((a, c) => a + c.quantity * c.price, 0).toFixed(2)}
                        </h5>
                      </div>
                    </div>
                    <div className="d-grid gap-2">
                      <button 
                        className="w-100 btn btn-lg btn-outline-primary light"  
                        type="button"
                        onClick={() => router.push('/shipping')}
                      >
                        Check Out
                      </button>
                    </div>                  
                  </div>
                </div>
              </div>
            </div>
            )}
          </div>
        </div>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Cart), { ssr: false });