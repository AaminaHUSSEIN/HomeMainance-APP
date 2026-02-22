import User from '../models/User.js';
import { Provider } from '../models/User.js'; // Hubi inaad soo dhoweysid Provider model
import Service from '../models/Service.js'; // Kan waa muhiim si loo helo ID-ga
import { generateToken } from '../utils/jwt.js';
import { sendVerificationEmail, sendPasswordResetEmail } from '../utils/email.js';
import crypto from 'crypto';

// 1. Diiwaangelinta (Register)
export const register = async (req, res) => {
  try {
    const { name, email, password, role, phone, address, serviceType, serviceId } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    // 1. Samee User-ka weyn
    const user = await User.create({ 
      name, 
      email, 
      password, 
      role: role || 'customer', 
      phone, 
      address,
      serviceType: role === 'provider' ? serviceType : undefined 
    });

    // --- WAXA KA DHIMAN EE XALLINAYA "GENERAL" ---
    if (user && role === 'provider') {
      let finalServiceId = serviceId;

      // Haddii frontend-ku uusan soo dirin ID, magaca ku raadi DB-ga
      if (!finalServiceId && serviceType) {
        const foundService = await Service.findOne({ 
          name: { $regex: new RegExp(`^${serviceType}$`, 'i') } 
        });
        if (foundService) finalServiceId = foundService._id;
      }

      // Samee Profile-ka Provider-ka (Halkan ayaan ku saxnay Axmed Cali vs Yyy)
      await Provider.create({
        user: user._id,
        fullName: name,
        email: email,
        phone: phone,
        serviceType: serviceType || "General",
        serviceId: finalServiceId, // Hadda ID-gu wuu raacayaa
        location: address || 'Lama cayimin',
        status: 'approved'
      });
    }
    // --------------------------------------------

    const verificationToken = crypto.randomBytes(32).toString('hex');
    await sendVerificationEmail(user, verificationToken);
    
    const token = generateToken(user._id);
    res.status(201).json({ _id: user._id, name: user.name, email: user.email, token });

  } catch (error) {
    console.error("❌ Register Error:", error);
    res.status(500).json({ message: 'Register error: ' + error.message });
  }
};

// --- SHAQOOYINKA KALE (Login, ForgotPassword, Reset) WAA SIDOODII ---
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = generateToken(user._id);
    res.json({ _id: user._id, name: user.name, email: user.email, role: user.role, token });
  } catch (error) {
    res.status(500).json({ message: 'Login error' });
  }
};

// Forgot Password & Reset Password (Koodkaagii ayaan u daayay siduu ahaa)
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    try {
      await sendPasswordResetEmail(user, resetToken);
      res.status(200).json({ message: 'Password reset email sent' });
    } catch (err) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return res.status(500).json({ message: 'Email could not be sent' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({ 
      resetPasswordToken, 
      resetPasswordExpire: { $gt: Date.now() } 
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Reset error' });
  }
};