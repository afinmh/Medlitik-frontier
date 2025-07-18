/**
 * Migration: Create Specializations Table (PostgreSQL)
 * File: 20250718000005-create-specializations-table.js
 */

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('specializations', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Add index
    await queryInterface.addIndex('specializations', ['name'], {
      unique: true,
      name: 'specializations_name_unique'
    });

    // Create trigger for updated_at
    await queryInterface.sequelize.query(`
      CREATE TRIGGER update_specializations_updated_at 
      BEFORE UPDATE ON specializations 
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    `);

    // Insert initial data
    await queryInterface.bulkInsert('specializations', [
      {
        name: 'Umum',
        description: 'Dokter Umum',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Jantung',
        description: 'Spesialis Jantung dan Pembuluh Darah',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Anak',
        description: 'Spesialis Anak',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Kandungan',
        description: 'Spesialis Kandungan dan Kebidanan',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Mata',
        description: 'Spesialis Mata',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'THT',
        description: 'Spesialis Telinga Hidung Tenggorokan',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Kulit',
        description: 'Spesialis Kulit dan Kelamin',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Saraf',
        description: 'Spesialis Saraf',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Jiwa',
        description: 'Spesialis Kesehatan Jiwa',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Gigi',
        description: 'Spesialis Gigi dan Mulut',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('specializations');
  }
};
