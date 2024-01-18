import { createRouter } from 'next-connect';
import Category from '../../../models/Category';
import db from '../../../utils/db';

const router = createRouter();

router.get(async (req, res) => {
    await db.connect();
    const categories = await Category.find({});
    await db.disconnect();
    res.send(categories);
});

export default router.handler();