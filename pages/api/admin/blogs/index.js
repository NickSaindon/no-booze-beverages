import { getToken } from 'next-auth/jwt';
import Blog from '../../../../models/Blog';
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
  const newBlog = new Blog({
    title: 'New Blog Post',
    headerImage: '/images/wholesale-header.jpg',
    description: 'Blog description goes here',
    author: 'Author goes here',
    article: 'Start creating a new blog post here',
    published: false,
    slug: 'sample-slug-' + Math.random()
  });

  const blogs = await newBlog.save();
  await db.disconnect();
  res.send({ message: 'Blog created successfully', blogs });
};

const getHandler = async (req, res) => {
  await db.connect();
  const blogs = await Blog.find({});
  await db.disconnect();
  res.send(blogs);
};

export default handler;