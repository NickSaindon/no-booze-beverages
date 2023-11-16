import Layout from '../../components/Layout';
import axios from 'axios';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import ProductItem from '../../components/ProductItem';
import Image from "next/image";
import data from '../../utils/data';
// import db from '../../utils/db';
// import Category from '../../models/Categories';
// import Product from '../../models/Product';
// import { Store } from '../../utils/Store';
import { ToastContainer, toast, Slide } from "react-toastify";

const Categories = (props) => {
//   const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const { slug } = router.query;
//   const { category, products } = props;
//   const { cart } = state;
    const categories = data.categories.find((x) => x.slug === slug);;
    // const categories = data.categories;

//   const addToCartHandler = async (product) => {
//     const existItem = cart.cartItems.find((x) => x.slug === product.slug);
//     const quantity = existItem ? existItem.quantity + 1 : 1;
//     const { data } = await axios.get(`/api/products/${product._id}`);

//     if (data.countInStock < quantity) {
//       return toast.error('Sorry, this product is out of stock', {
//         theme: "colored"
//       });
//     }
//     dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
//   };

    return (
        <Layout 
        title="No Booze Beverages | Product Category"
        description="No Booze Beverages.">
            <ToastContainer 
              position="top-center" 
              draggable={false} 
              transition={Slide} 
              autoClose={5000}
              hideProgressBar={true}
              className="toast-alert"
            />
          <div className="category-container py-5 bg-white">
            <div className="category-header" style={{backgroundImage: `url(${categories?.categoryImage})` }}>
              <h1>{categories?.name}</h1>
              <p className="lead">
                    {categories?.categoryText}
                  </p>
            </div>
            <div className="container-xl py-5">
              <div className="row product-category-row gy-3">
                {data.products.filter((p) => p.category === slug).map((product) => (
                  <ProductItem 
                    product={product} 
                    key={product.slug}
                  />
                ))}
              </div>
            </div>
          </div>
      </Layout>
    )
}

export default Categories;

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const { slug } = params;

//   await db.connect();
//   const category = await Category.findOne({slug}).lean();
//   const products = await Product.find().lean();
//   await db.disconnect();
//   return {
//     props: {
//       category: db.convertDocToObj(category),
//       products: products.map(db.convertDocToObj)
//     }
//   }
// }