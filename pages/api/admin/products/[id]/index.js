import { createRouter } from 'next-connect';
import { getToken } from 'next-auth/jwt';
import Product from '../../../../../models/Product';
import db from '../../../../../utils/db';

const router = createRouter();

const handler = async (req, res) => {
  const user = await getToken({ req });
  if (!user || (user && !user.isAdmin)) {
    return res.status(401).send('signin required');
  }

  if (req.method === 'GET') {
    return getHandler(req, res, user);
  } else if (req.method === 'PUT') {
    return putHandler(req, res, user);
  } else if (req.method === 'DELETE') {
    return deleteHandler(req, res, user);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};

const getHandler = async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  await db.disconnect();
  res.send(product);
};

const putHandler = async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  if (product) {
    product.name = req.body.name;
    product.flavor = req.body.flavor;
    product.slug = req.body.slug;
    product.category = req.body.category;
    product.size = req.body.size;
    product.imageOne = req.body.imageOne;
    product.imageTwo = req.body.imageTwo;
    product.imageThree = req.body.imageThree;
    product.imageFour = req.body.imageFour;
    product.size = req.body.size;
    product.color = req.body.color;
    product.priceSizes = req.body.priceSizes;
    product.packSize = req.body.packSize;
    product.price = req.body.price;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;
    product.featuredImage = req.body.featuredImage;
    product.featured = req.body.featured;
    await product.save();
    await db.disconnect();
    res.send({ message: 'Product updated successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Product not found' });
  }
};

const deleteHandler = async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  if (product) {
    await product.deleteOne();
    await db.disconnect();
    res.send({ message: 'Product deleted successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Product not found' });
  }
};
export default handler;