/**
 * Migration: Create Consultations Table (PostgreSQL)
 * File: 20250718000003-create-consultations-table.js
 */

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create ENUM types
    await queryInterface.sequelize.query(`
      DO $$ BEGIN
        CREATE TYPE consultation_type_enum AS ENUM ('chat', 'voice', 'video');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    await queryInterface.sequelize.query(`
      DO $$ BEGIN
        CREATE TYPE consultation_status_enum AS ENUM ('pending', 'active', 'completed', 'cancelled', 'refunded');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    await queryInterface.sequelize.query(`
      DO $$ BEGIN
        CREATE TYPE payment_status_enum AS ENUM ('pending', 'paid', 'failed', 'refunded');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    await queryInterface.createTable('consultations', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      patient_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      doctor_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'doctors',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      consultation_type: {
        type: 'consultation_type_enum',
        allowNull: false,
        defaultValue: 'chat'
      },
      status: {
        type: 'consultation_status_enum',
        allowNull: false,
        defaultValue: 'pending'
      },
      chief_complaint: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      symptoms: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      medical_history: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      diagnosis: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      treatment_plan: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      prescription: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      follow_up_required: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      follow_up_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      fee_amount: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      payment_status: {
        type: 'payment_status_enum',
        allowNull: false,
        defaultValue: 'pending'
      },
      payment_method: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      scheduled_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      started_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      ended_at: {
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
    await queryInterface.addIndex('consultations', ['patient_id'], {
      name: 'consultations_patient_id_index'
    });

    await queryInterface.addIndex('consultations', ['doctor_id'], {
      name: 'consultations_doctor_id_index'
    });

    await queryInterface.addIndex('consultations', ['status'], {
      name: 'consultations_status_index'
    });

    await queryInterface.addIndex('consultations', ['scheduled_at'], {
      name: 'consultations_scheduled_at_index'
    });

    await queryInterface.addIndex('consultations', ['payment_status'], {
      name: 'consultations_payment_status_index'
    });

    // Create trigger for updated_at
    await queryInterface.sequelize.query(`
      CREATE TRIGGER update_consultations_updated_at 
      BEFORE UPDATE ON consultations 
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('consultations');
    
    // Drop ENUM types
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS consultation_type_enum;');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS consultation_status_enum;');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS payment_status_enum;');
  }
};
