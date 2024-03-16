import { getToken } from 'next-auth/jwt';
import Product from '../../../../models/Product';
import db from '../../../../utils/db';

const handler = async (req, res) => {
  const user = await getToken({ req });
  if (!user || !user.isAdmin) {
    return res.status(401).send('admin signin required');
  }
  if (req.method === 'GET') {
    return getHandler(req, res);
  } else if (req.method === 'POST') {
    return postHandler(req, res);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};

const postHandler = async (req, res) => {
  await db.connect();
  const newProduct = new Product({
    name: 'Product Name',
    flavor: 'Product Flavor Here',
    slug: 'product-name-' + Math.random(),
    category: 'product-category',
    imageOne: '/images/product-image-size.jpg',
    imageTwo: '/images/product-image-size.jpg',
    imageThree: '/images/product-image-size.jpg',
    imageFour: '/images/product-image-size.jpg',
    size: '12oz',
    color: '',
    priceSizes: [
      {
        packSize: '4 Pack',
        price: 24.00,
        countInStock: 0,
      },
      {
        packSize: '6 Pack',
        price: 36.00,
        countInStock: 0,
      },
      {
        packSize: '8 Pack',
        price: 48.00,
        countInStock: 0,
      },
      {
        packSize: '12 Pack',
        price: 72.00,
        countInStock: 0,
      },
      {
        packSize: '24 Pack',
        price: 144.00,
        countInStock: 0,
      },
    ],
    rating: 0,
    numReviews: 0,
    description: 'Must add a product description here.',
    featuredImage: '/images/featured-image-size.jpg',
    featured: false
  });

  const product = await newProduct.save();
  await db.disconnect();
  res.send({ message: 'Product created successfully', product });
};

const getHandler = async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();
  res.send(products);
};
export default handler;