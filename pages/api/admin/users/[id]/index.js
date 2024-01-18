import { getToken } from 'next-auth/jwt';
import User from '../../../../../models/User';
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
  const user = await User.findById(req.query.id);
  await db.disconnect();
  res.send(user);
};

const putHandler = async (req, res) => {
  await db.connect();
  const user = await User.findById(req.query.id);
  if (user) {
    user.name = req.body.name;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.birthDate = req.body.birthDate;
    user.companyName = req.body.companyName;
    user.streetName = req.body.streetName;
    user.city = req.body.city;
    user.province = req.body.province;
    user.postalCode = req.body.postalCode;
    user.country = req.body.country;
    user.password = req.body.password;
    user.isAdmin = req.body.isAdmin;
    user.isVendor = req.body.isVendor;
    await user.save();
    await db.disconnect();
    res.send({ message: 'User updated successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'User not found' });
  }
};

const deleteHandler = async (req, res) => {
  await db.connect();
  const user = await User.findById(req.query.id);
  if (user) {
    await user.deleteOne();
    await db.disconnect();
    res.send({ message: 'User deleted successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'User not found' });
  }
};

export default handler;