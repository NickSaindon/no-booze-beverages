import Order from '../../../models/Order';
import db from '../../../utils/db';

const handler = async (req, res) => {
  try {
    await db.connect();

    const newOrder = new Order({
      ...req.body,
      isPaid: true,
      paidAt: Date.now()
    });

    const order = await newOrder.save();

    const orderId = order._id; 

    res.status(201).json({ order, orderId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

export default handler;