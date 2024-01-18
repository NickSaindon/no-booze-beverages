import  mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        headerImage: {  type: String, required: true },
        tags: { type: Array, required: false},
        description: { type: String, required: true },
        author: { type: String, required: true },
        article: { type: String, required: true },
        published: { type: Boolean, required: true, default: false },
        slug: { type: String, required: true, unique: true  },
    }, 
    {
        timestamps: true
    }
);

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default Blog;