import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    phone: { type: String },
    // --- KHADADKA LAGU DARAY SI LOCATION-KU U SHAQEEYO ---
    location: { type: String, default: "" }, 
    bio: { type: String, default: "" },
    serviceType: { type: String, default: "Professional Specialist" },
    // ---------------------------------------------------
    isVerified: { type: Boolean, default: false },
    role: { 
        type: String, 
        enum: ['customer', 'admin', 'provider'], 
        default: 'customer' 
    }
}, { timestamps: true });

// Password-ka qari (Hash) ka hor keydinta
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10); 
    this.password = await bcrypt.hash(this.password, salt);
});

// Function-ka hubinta password-ka (Login)
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Ka hortagga "OverwriteModelError"
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;