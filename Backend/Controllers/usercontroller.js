import jwt from 'jsonwebtoken';
import { User, Provider } from '../models/User.js';

// 1. Diiwaangelinta (Register)
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, role, serviceType, location } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'Email-kan hore ayaa loo diiwaangeliyey' });
    }

    const user = await User.create({
      name,
      email,
      password, 
      phone,
      role: role || 'customer'
    });

    if (user) {
      if (role === 'provider') {
        await Provider.create({
          user: user._id,
          fullName: name,
          serviceType: serviceType, 
          location: location || 'Lama cayimin',
          status: 'approved' 
        });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "fallback_secret_123", { expiresIn: '30d' });

      res.status(201).json({
        success: true,
        token,
        user: { _id: user._id, name: user.name, email: user.email, role: user.role }
      });
    }
  } catch (error) {
    console.error('🔥 Register Error:', error.message);
    res.status(500).json({ success: false, message: 'Cillad farsamo: ' + error.message });
  }
};

// 2. Soo gelidda (Login)
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) { 
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "fallback_secret_123", { expiresIn: '30d' });

      res.json({
        success: true,
        token,
        user: { _id: user._id, name: user.name, email: user.email, role: user.role }
      });
    } else {
      res.status(401).json({ success: false, message: 'Email ama Password khaldan' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server-ka ayaa cillad la kulmay' });
  }
};

// 3. Helitaanka dhammaan Khubarada (List View)
export const getAllProviders = async (req, res) => {
  try {
    const { serviceId } = req.query; 
    let filter = {};
    if (serviceId && serviceId !== 'null' && serviceId !== 'undefined') {
      filter.serviceType = serviceId;
    }

    const providers = await Provider.find(filter).populate({
      path: 'user',
      select: 'name email phone role'
    });

    const formattedProviders = providers.map(p => {
      if (!p.user) return null;
      return {
        _id: p.user._id, 
        name: p.fullName || p.user.name,
        email: p.user.email,
        phone: p.user.phone,
        location: p.location,
        services: p.serviceType ? [p.serviceType.toString()] : [],
        status: p.status
      };
    }).filter(p => p !== null);

    res.json({ success: true, data: formattedProviders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. KAN CUSUB: Helitaanka hal Provider (Profile View)
export const getProviderById = async (req, res) => {
  try {
    // Waxaan u baahanahay inaan ku dhex raadino Provider model-ka adoo isticmaalaya User ID-ga
    const provider = await Provider.findOne({ user: req.params.id }).populate('user', 'name email phone role');
    
    if (!provider) {
      return res.status(404).json({ success: false, message: 'Khabiirka lama helin' });
    }

    // U soo celi xogta si nadiif ah
    res.json({
      success: true,
      data: {
        _id: provider.user._id, // Kani waa User ID-ga loo baahan yahay Booking-ka
        name: provider.fullName || provider.user.name,
        email: provider.user.email,
        phone: provider.user.phone,
        location: provider.location,
        serviceType: provider.serviceType,
        status: provider.status
      }
    });
  } catch (error) {
    console.error('🔥 Get Profile Error:', error.message);
    res.status(500).json({ success: false, message: 'Cillad: ' + error.message });
  }
};