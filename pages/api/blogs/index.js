import { createRouter } from 'next-connect';
import Blog from '../../../models/Blog';
import db from '../../../utils/db';

const router = createRouter();

router.get(async (req, res) => {
    await db.connect();
    const blogs = await Blog.find({});
    await db.disconnect();
    res.send(blogs);
});

export default router.handler();