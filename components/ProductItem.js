import { useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

const ProductItem = ({ product, category }) => {

  useEffect(() => {
    gsap.timeline()
    .fromTo(".product-card", { y:-100, opacity:0, ease: 1}, {y: 0, opacity: 1, stagger: 0.2  })
    .delay(2.5);
  }, []);

  return (
    <div className="col col-md-6 col-lg-4 d-flex justify-content-center mx-auto">
      <div className="card product-card shadow-sm">
        <Link 
          href={`/products/${category.slug}/${product.slug}`}
          legacyBehavior
        >
          <div className="card-img-container">
            <div className="product-card-img" style={{backgroundImage: `url(${product.imageOne})` }}></div>
          </div>
        </Link>                  
        <div className="card-body text-primary text-center">
          <h4 className="card-text fw-bold">{product.flavor}</h4>
          <h5 className="card-text">{product.name}</h5>
          <div className="row">
            <div className="col-lg-12 gy-2">
              <Link 
                href={`/products/${category.slug}/${product.slug}`} 
              >
                <button 
                  type="button" 
                  className="w-100 btn btn-lg btn-outline-primary light"
                >
                  Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductItem;