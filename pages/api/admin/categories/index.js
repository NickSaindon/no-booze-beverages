import { getToken } from 'next-auth/jwt';
import Category from '../../../../models/Category';
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
  const newCategories = new Category({
    name: 'Category Name',
    slug: 'sample-category-' + Math.random(),
    categoryImage: '/images/do-raw-powder-bags.jpg',
    categoryText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  });

  const categories = await newCategories.save();
  await db.disconnect();
  res.send({ message: 'Product created successfully', categories });
};

const getHandler = async (req, res) => {
  await db.connect();
  const categories = await Category.find({});
  await db.disconnect();
  res.send(categories);
};

export default handler;