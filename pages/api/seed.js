import Product from '../../models/Product';
// import Blog from '../../models/Blog';

// import Category from '../../models/Category';
// import User from '../../models/User';
import data from '../../utils/data';
import db from '../../utils/db';

const handler = async (req, res) => {
  await db.connect();
  // await User.deleteMany();
  // await User.insertMany(data.users);
  // await Category.deleteMany();
  // await Category.insertMany(data.categories);
  await Product.deleteMany();
  await Product.insertMany(data.products);
  // await Blog.deleteMany();
  // await Blog.insertMany(data.blogs);
  await db.disconnect();
  res.send({ message: 'seeded successfully' });
};
export default handler;