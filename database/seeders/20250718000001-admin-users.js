/**
 * Seeder: Admin Users
 * File: 20250718000001-admin-users.js
 */

'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    await queryInterface.bulkInsert('users', [
      {
        email: 'admin@medlitik.com',
        password: hashedPassword,
        full_name: 'System Administrator',
        role: 'admin',
        is_verified: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        email: 'doctor1@medlitik.com',
        password: hashedPassword,
        full_name: 'Dr. Ahmad Wijaya',
        role: 'doctor',
        is_verified: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        email: 'patient1@medlitik.com',
        password: hashedPassword,
        full_name: 'Budi Santoso',
        role: 'patient',
        is_verified: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', {
      email: {
        [Sequelize.Op.in]: [
          'admin@medlitik.com',
          'doctor1@medlitik.com',
          'patient1@medlitik.com'
        ]
      }
    }, {});
  }
};
