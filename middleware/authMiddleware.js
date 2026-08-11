import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized. Token missing.',
    });
  }

  try {
    const secret = process.env.JWT_SECRET || 'skokka_super_secret_jwt_key_2026_production';
    const decoded = jwt.verify(token, secret);

    const adminId = decoded.id || decoded.sub;
    let admin = null;

    if (adminId) {
      admin = await Admin.findById(adminId).select('-password');
    }

    if (!admin && decoded.email) {
      admin = await Admin.findOne({ email: decoded.email.toLowerCase() }).select('-password');
    }

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized. Admin account not found.',
      });
    }

    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Account disabled. Please contact Root Super Admin.',
      });
    }

    req.admin = admin;
    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized. Invalid or expired token.',
    });
  }
};