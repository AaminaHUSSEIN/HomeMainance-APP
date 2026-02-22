import express from 'express';
import jwt from 'jsonwebtoken';
import { User, Provider } from '../models/models.js'; 
import { protect } from '../middleware/auth.js'; 

const router = express.Router();

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// --- 1. GET PROFILE ---
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ success: false, message: "Isticmaalaha lama helin" });
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// --- 2. UPDATE PROFILE ---
router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      if (req.body.password) user.password = req.body.password;

      const updatedUser = await user.save();
      res.json({
        success: true,
        user: {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
          phone: updatedUser.phone
        }
      });
    } else {
      res.status(404).json({ success: false, message: "Isticmaalaha lama helin" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// --- 3. HELITAANKA DHAMAAN KHUBARADA (Providers List) ---
// Tani waxay xallinaysaa in dadka cusub (Axmed Cali) ay soo muuqdaan
router.get('/providers', async (req, res) => {
  try {
    const { serviceId } = req.query;
    
    // Filter-ka aasaasiga ah: Kaliya kuwa 'approved' ah
    let filter = { status: 'approved' };

    // Haddii serviceId uu URL-ka ku jiro, ku dar filter-ka
    if (serviceId && serviceId !== 'null' && serviceId !== 'undefined') {
      filter.serviceId = serviceId; 
    }

    const activeProviders = await Provider.find(filter)
      .sort({ updatedAt: -1 });
    
    res.status(200).json({ 
      success: true, 
      count: activeProviders.length,
      data: activeProviders 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// --- 4. HELITAANKA HAL KHABIIR (Single Provider) ---
router.get('/provider/:id', async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);
    
    if (!provider) {
      return res.status(404).json({ success: false, message: "Khabiirka lama helin!" });
    }
    
    res.status(200).json({ success: true, data: provider });
  } catch (error) {
    res.status(500).json({ success: false, message: "ID-ga khabiirka maahan mid sax ah." });
  }
});

// --- 5. LOGIN ---
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: "Email ama Password khaldan" });
    }
    
    const token = generateToken(user);
    res.json({ 
      success: true, 
      token, 
      user: { id: user._id, name: user.name, role: user.role } 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// --- 6. REGISTER ---
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    const userExists = await User.findOne({ email });
    
    if (userExists) return res.status(400).json({ success: false, message: "Email-kan waa la isticmaalay" });

    const user = await User.create({ name, email, password, phone, role: role || 'customer' });

    if (user.role === 'provider') {
      await Provider.create({ 
        user: user._id, 
        fullName: name, 
        email: email, 
        phone: phone, 
        status: 'pending' 
      });
    }

    const token = generateToken(user);
    res.status(201).json({ success: true, token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;