/**
 * Migration: Create Doctors Table (PostgreSQL)
 * File: 20250718000002-create-doctors-table.js
 */

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('doctors', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      license_number: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      specialization: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      sub_specialization: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      experience_years: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      education: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      certifications: {
        type: Sequelize.JSONB, // JSONB for PostgreSQL
        allowNull: true
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      consultation_fee: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
        defaultValue: 0.00
      },
      rating: {
        type: Sequelize.DECIMAL(3,2),
        allowNull: true,
        defaultValue: 0.00
      },
      total_reviews: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      is_available: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      is_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      verified_at: {
        type: Sequelize.DATE,
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

    // Add indexes
    await queryInterface.addIndex('doctors', ['user_id'], {
      unique: true,
      name: 'doctors_user_id_unique'
    });

    await queryInterface.addIndex('doctors', ['license_number'], {
      unique: true,
      name: 'doctors_license_number_unique'
    });

    await queryInterface.addIndex('doctors', ['specialization'], {
      name: 'doctors_specialization_index'
    });

    await queryInterface.addIndex('doctors', ['rating'], {
      name: 'doctors_rating_index'
    });

    await queryInterface.addIndex('doctors', ['is_available', 'is_verified'], {
      name: 'doctors_availability_index'
    });

    // Add rating constraint
    await queryInterface.sequelize.query(`
      ALTER TABLE doctors 
      ADD CONSTRAINT check_rating_range 
      CHECK (rating >= 0.00 AND rating <= 5.00);
    `);

    // Create trigger for updated_at
    await queryInterface.sequelize.query(`
      CREATE TRIGGER update_doctors_updated_at 
      BEFORE UPDATE ON doctors 
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('doctors');
  }
};
