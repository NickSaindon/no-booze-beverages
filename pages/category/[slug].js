import Layout from '../../components/Layout';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import ProductItem from '../../components/ProductItem';
import db from '../../utils/db';
import gsap from 'gsap';
import Category from '../../models/Category';
import Product from '../../models/Product';
import { Container, Row } from 'react-bootstrap';

const Categories = (props) => {
  const router = useRouter();
  const { slug } = router.query;
  const { category, products } = props;

  useEffect(() => {
    gsap.timeline()
    .fromTo(".category-header", { opacity: 0, ease: 1, duration: 0.3 }, { opacity: 1 })
    .fromTo(".category-header h1", {y:-100, opacity:0, ease:"back", duration: 1}, {y:0, opacity: 1})
    .fromTo(".category-header p", {opacity:0, ease:"back", duration: 1}, { opacity: 1})
    .delay(2);
  }, []);

  return (
    <Layout 
      title="No Booze Beverages | Product Category"
      description="No Booze Beverages."
    >
      <div className="category-container page-contain py-5 bg-white">
        <div className="category-header" style={{backgroundImage: `url(${category?.categoryImage})` }}>
          <h1>{category?.name}</h1>
          <p className="lead">
            {category?.categoryText}
          </p>
        </div>
        <Container fluid="xl" className="py-5">
          <Row className="product-category-row gy-3">
            {products.filter((p) => p.category === slug).map((product) => (
              <ProductItem 
                product={product}
                category={category}
                key={product.slug}
              />
            ))}
          </Row>
        </Container>
      </div>
    </Layout>
  )
}

export default Categories;

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const category = await Category.findOne({slug}).lean();
  const products = await Product.find().lean();
  await db.disconnect();
  return {
    props: {
      category: db.convertDocToObj(category),
      products: JSON.parse(JSON.stringify(products)),
    }
  }
}