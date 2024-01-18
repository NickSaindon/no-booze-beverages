import { createRouter } from 'next-connect';
import { getToken } from 'next-auth/jwt';
import Blog from '../../../../../models/Blog';
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
  const blogs = await Blog.findById(req.query.id);
  await db.disconnect();
  res.send(blogs);
};

const putHandler = async (req, res) => {
  await db.connect();
  const blogs = await Blog.findById(req.query.id);
  if (blogs) {
    blogs.title = req.body.title;
    blogs.headerImage = req.body.headerImage;
    blogs.description = req.body.description;
    blogs.author = req.body.author;
    blogs.article = req.body.article;
    blogs.published = req.body.published;
    blogs.slug = req.body.slug;
    await blogs.save();
    await db.disconnect();
    res.send({ message: 'Blog updated successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Blog not found' });
  }
};

const deleteHandler = async (req, res) => {
  await db.connect();
  const blogs = await Blog.findById(req.query.id);
  if (blogs) {
    await blogs.deleteOne();
    await db.disconnect();
    res.send({ message: 'Blog deleted successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Blog not found' });
  }
};

export default handler;