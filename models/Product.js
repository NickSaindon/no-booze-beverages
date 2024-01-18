import  mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        flavor: { type: String, required: false },
        slug: { type: String, required: true, unique: true  },
        category: { type: String, required: true },
        imageOne: {  type: String, required: true },
        imageTwo: {  type: String, required: true },
        imageThree: {  type: String, required: true },
        imageFour: {  type: String, required: true },
        size: { type: String, required: false },
        color: { type: String, required: false },
        priceSizes: [ 
          {
            packSize: { type: String, required: true },
            price: { type: Number, required: true },
            countInStock: { type: Number, required: true, default: 0 },
          },
        ],
        rating: { type: Number, required: false, default: 0 },
        numReviews: { type: Number, required: false, default: 0 },
        description: { type: String, required: true },
        featuredImage: {  type: String, required: true },
        featured: { type: Boolean, required: true, default: false },
    }, 
    {
        timestamps: true
    }
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;