import Category from '../../models/Category';
import User from '../../models/User';
import data from '../../utils/data';
import db from '../../utils/db';

const handler = async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await Category.deleteMany();
  await Category.insertMany(data.categories);

  await db.disconnect();
  res.send({ message: 'seeded successfully' });
};
export default handler;