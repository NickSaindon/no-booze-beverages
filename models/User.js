import  mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: false },
        birthDate: { type: String, required: false },
        companyName: { type: String, required: false },
        streetName: { type: String, required: false },
        city:  { type: String, required: false },
        province: { type: String, required: false },
        postalCode: { type: String, required: false },
        country: { type: String, required: false },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, required: true, default: false },
        isVendor: { type: Boolean, required: true, default: false },
    }, 
    {
        timestamps: true
    }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;