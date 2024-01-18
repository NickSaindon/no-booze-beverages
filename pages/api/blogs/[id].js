import { createRouter } from 'next-connect';
import Blog from '../../../models/Blog';
import db from '../../../utils/db';

const router = createRouter();

router.get(async (req, res) => {
    await db.connect();
    const blogs = await Blog.findById(req.query.id);
    await db.disconnect();
    res.send(blogs);
});

export default router.handler();