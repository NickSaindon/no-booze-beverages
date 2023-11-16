import { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
// import { Store } from '../utils/Store';

const ProductItem = ({ product, addToCartHandler }) => {
//   const { state, dispatch } = useContext(Store);
  const router = useRouter();


  return (
    <div className="col col-md-6 col-lg-4 d-flex justify-content-center mx-auto">
      <div className="card shadow-sm">
        <Link 
          href={`/product/${product.slug}`}
          legacyBehavior
        >
          <div className="card-img-container">
            <div className="product-card-img" style={{backgroundImage: `url(${product.imageOne})` }}></div>
          </div>
        </Link>                  
        <div className="card-body text-primary text-center">
          <h5 className="card-text">${product.price.toFixed(2)}</h5>
          <h4 className="card-text">{product.name}</h4>
          <h5 className="card-text">{product.flavor}</h5>
          <div className="row">
            <div className="col-lg-6 gy-2">
              <Link 
                href={`/product/${product.slug}`} 
              >
                <button 
                  type="button" 
                  className="w-100 btn btn-lg btn-outline-primary light"
                >
                  Details
                </button>
              </Link>
            </div>
            <div className="col-lg-6 gy-2">
              <button 
                type="button" 
                className="w-100 btn btn-lg btn-outline-primary light"
                onClick={() => addToCartHandler(product)}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductItem;