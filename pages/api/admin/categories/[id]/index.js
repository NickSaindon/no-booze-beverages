import { getToken } from 'next-auth/jwt';
import Category from '../../../../../models/Category';
import db from '../../../../../utils/db';

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
  const category = await Category.findById(req.query.id);
  await db.disconnect();
  res.send(category);
};

const putHandler = async (req, res) => {
  await db.connect();
  const category = await Category.findById(req.query.id);
  if (category) {
    category.name = req.body.name;
    category.slug = req.body.slug;
    category.categoryImage = req.body.categoryImage;
    category.categoryText = req.body.categoryText;
    await category.save();
    await db.disconnect();
    res.send({ message: 'Category updated successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Category not found' });
  }
};

const deleteHandler = async (req, res) => {
  await db.connect();
  const category = await Category.findById(req.query.id);
  if (category) {
    await category.deleteOne();
    await db.disconnect();
    res.send({ message: 'Category deleted successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Category not found' });
  }
};

export default handler;