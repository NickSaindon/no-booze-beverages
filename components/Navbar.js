import axios from 'axios';
import { signOut, useSession } from 'next-auth/react';
import React, { useContext, useEffect, useState, useReducer } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import Image from "next/image";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Store } from '../utils/Store';
import { getError } from '../utils/error';
import DropdownLink from './DropdownLinks';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, categories: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
    state;
  }
}

const Navbar = () => {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const router = useRouter();
  const [ cartItemsCount, setCartItemsCount ] = useState(0);
  const [
    { loading, error, categories },
      dispatchCat,
  ] = useReducer(reducer, {
      loading: true,
      categories: [],
      error: '',
    });

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/signin' });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatchCat({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/categories`);
        dispatchCat({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatchCat({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();

    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems])

  return (
    <nav className="navbar fixed-top navbar-expand-lg">
      <div className="container-fluid">
        <Link href="/">
          <div className="navbar-brand">
            <Image src="/images/no-booze-logo.png" width={60} height={60} alt="No Booze Beverages logo"/>
          </div>
        </Link>        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor03">
          <ul className="navbar-nav navbar-left me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/" className={router.asPath == "/" ? "nav-link active" : "nav-link"} aria-current="page">Home</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Products
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              {categories.sort((a, b) => a._id.localeCompare(b._id)).map((category) => (
                <li key={category.slug}>
                  <Link href={`/category/${category.slug}`} className="dropdown-item">{category.name}</Link>
                </li>
              ))}
              </ul>
            </li>
            <li className="nav-item">
              <Link href="/about" className={router.asPath == "/about" ? "nav-link active" : "nav-link"}>
                Our Journey  
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/wholesale" className={router.asPath == "/wholesale" ? "nav-link active" : "nav-link"}>
                Wholesale  
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/news" className={router.asPath == "/news" ? "nav-link active" : "nav-link"}>
                News  
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className={router.asPath == "/contact" ? "nav-link active" : "nav-link"}>
                Contact  
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            <ul className="navbar-nav navbar-left me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link href="/cart" className={router.asPath == "/cart" ? "nav-link active" : "nav-link"}>
                  <i className="bi bi-cart3"></i> 
                  {cartItemsCount > 0 && (
                    <span className="badge rounded-pill bg-primary">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
              </li>
              <li className="nav-item">
                {status === 'loading' ? (
                  'Loading'
                  ) : session?.user ? (
                  <ul>
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {session.user.name}
                      </a>
                      <ul 
                        className="dropdown-menu dropdown-menu-end" 
                        aria-labelledby="navbarDropdown"
                      >
                        {!session.user.isAdmin && 
                          <>
                            <li> 
                              <Link href="/profile" className="dropdown-item">
                                Profile
                              </Link>
                            </li>
                            <li>
                              <Link href="/order-history" replace className="dropdown-item">
                                Order History
                              </Link>
                            </li>
                          </>
                        }
                        {session.user.isAdmin && (
                          <>
                            <li>
                              <DropdownLink
                                className="dropdown-item"
                                href="/admin/dashboard"
                              >
                                Dashboard
                              </DropdownLink>
                            </li>
                            <li>
                              <DropdownLink
                                className="dropdown-item"
                                href="/admin/categories"
                              >
                                Categories
                              </DropdownLink>
                            </li>
                            <li>
                              <DropdownLink
                                className="dropdown-item"
                                href="/admin/products"
                              >
                                Products
                              </DropdownLink>
                            </li>
                            <li>
                              <DropdownLink
                                className="dropdown-item"
                                href="/admin/users"
                              >
                                Users
                              </DropdownLink>
                            </li>
                            <li>
                              <DropdownLink
                                className="dropdown-item"
                                href="/admin/orders"
                              >
                                Orders
                              </DropdownLink>
                            </li>
                            <li>
                              <DropdownLink
                                className="dropdown-item"
                                href="/admin/blogs"
                              >
                                Blogs
                              </DropdownLink>
                            </li>
                          </>
                        )}
                        <li>
                          <a
                            className="dropdown-item"
                            href="#"
                            onClick={logoutClickHandler}
                          >
                            Logout
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                  ) : (
                    <Link href="/signin" className={router.asPath == "/signin" ? "nav-link active" : "nav-link"}>
                      Signin
                    </Link>
                  )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
