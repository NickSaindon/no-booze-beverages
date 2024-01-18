import { getToken } from 'next-auth/jwt';
import Order from '../../../models/Order';
import db from '../../../utils/db';

const handler = async (req, res) => {
  // const user = await getToken({ req });

  await db.connect();
  const newOrder = new Order({
    ...req.body,
    isPaid: true,
    paidAt: Date.now()
  });

  const order = await newOrder.save();
  res.status(201).send(order);
};

export default handler;