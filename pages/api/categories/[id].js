import { createRouter } from 'next-connect';
import Categories from '../../../models/Product';
import db from '../../../utils/db';

const router = createRouter();

router.get(async (req, res) => {
    await db.connect();
    const product = await Categories.findById(req.query.id);
    await db.disconnect();
    res.send(product);
});

export default router.handler();