/**
 * Migration: Create Messages Table (PostgreSQL)
 * File: 20250718000004-create-messages-table.js
 */

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create ENUM type
    await queryInterface.sequelize.query(`
      DO $$ BEGIN
        CREATE TYPE message_type_enum AS ENUM ('text', 'image', 'file', 'voice', 'system');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    await queryInterface.createTable('messages', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      consultation_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'consultations',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      sender_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      message_type: {
        type: 'message_type_enum',
        allowNull: false,
        defaultValue: 'text'
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      file_url: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      file_name: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      file_size: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      is_read: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      read_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      is_edited: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      edited_at: {
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
    await queryInterface.addIndex('messages', ['consultation_id'], {
      name: 'messages_consultation_id_index'
    });

    await queryInterface.addIndex('messages', ['sender_id'], {
      name: 'messages_sender_id_index'
    });

    await queryInterface.addIndex('messages', ['created_at'], {
      name: 'messages_created_at_index'
    });

    await queryInterface.addIndex('messages', ['is_read'], {
      name: 'messages_is_read_index'
    });

    // Create trigger for updated_at
    await queryInterface.sequelize.query(`
      CREATE TRIGGER update_messages_updated_at 
      BEFORE UPDATE ON messages 
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('messages');
    
    // Drop ENUM type
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS message_type_enum;');
  }
};
