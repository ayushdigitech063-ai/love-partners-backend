import { Admin } from '../models/Admin.js';

export const autoSeedSuperAdmin = async () => {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      await Admin.create({
        fullName: 'Super Admin',
        email: 'admin@lovepartners.in',
        mobile: '+91 99822 93000',
        password: 'AdminPassword123!',
        role: 'super_admin',
        permissions: [
          'approve_ads',
          'edit_profiles',
          'verify_documents',
          'ban_users',
          'view_revenue',
          'system_settings',
        ],
        isVerified: true,
        isActive: true,
      });
      console.log('🌱 Default Super Admin account created: admin@lovepartners.in / AdminPassword123!');
    }
  } catch (err) {
    console.error('Auto seed Super Admin error:', err.message);
  }
};
