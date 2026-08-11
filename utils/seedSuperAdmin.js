import { Admin } from '../models/Admin.js';

export const autoSeedSuperAdmin = async () => {
  try {
    const defaultEmail = process.env.SUPER_ADMIN_EMAIL || 'admin@lovepartners.in';
    const defaultPassword = process.env.SUPER_ADMIN_PASSWORD || 'AdminPassword123!';
    const defaultMobile = process.env.SUPER_ADMIN_MOBILE || '+91 99822 93000';

    let superAdmin = await Admin.findOne({ role: 'super_admin' });

    if (!superAdmin) {
      // Also check if admin exists by email
      superAdmin = await Admin.findOne({ email: defaultEmail.toLowerCase() });
    }

    if (!superAdmin) {
      await Admin.create({
        fullName: 'Super Admin',
        email: defaultEmail,
        mobile: defaultMobile,
        password: defaultPassword,
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
      console.log(`🌱 Default Super Admin account created: ${defaultEmail} / ${defaultPassword}`);
    } else {
      // Ensure super_admin has the latest email & password on startup if modified
      superAdmin.email = defaultEmail;
      superAdmin.mobile = defaultMobile;
      superAdmin.password = defaultPassword; // trigger pre('save') hash
      superAdmin.role = 'super_admin';
      superAdmin.isVerified = true;
      superAdmin.isActive = true;
      await superAdmin.save();
      console.log(`✅ Super Admin credentials auto-synced: ${defaultEmail} / ${defaultPassword}`);
    }
  } catch (err) {
    console.error('❌ Auto seed Super Admin error:', err.message);
  }
};

