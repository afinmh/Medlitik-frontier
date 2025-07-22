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
        first_name: 'System',
        last_name: 'Administrator',
        phone: '+62812-3456-7890',
        date_of_birth: '1990-01-01',
        gender: 'male',
        role: 'admin',
        is_verified: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        email: 'doctor1@medlitik.com',
        password: hashedPassword,
        first_name: 'Dr. Ahmad',
        last_name: 'Wijaya',
        phone: '+62813-4567-8901',
        date_of_birth: '1985-05-15',
        gender: 'male',
        role: 'doctor',
        is_verified: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        email: 'patient1@medlitik.com',
        password: hashedPassword,
        first_name: 'Budi',
        last_name: 'Santoso',
        phone: '+62814-5678-9012',
        date_of_birth: '1992-08-20',
        gender: 'male',
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
