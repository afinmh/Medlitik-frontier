/**
 * Messages Table Schema
 * Skema untuk tabel pesan chat dalam konsultasi
 */

const messagesSchema = {
  tableName: 'messages',
  columns: {
    id: {
      type: 'BIGINT',
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    consultation_id: {
      type: 'BIGINT',
      allowNull: false,
      references: {
        model: 'consultations',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    sender_id: {
      type: 'BIGINT',
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    message_type: {
      type: 'ENUM',
      values: ['text', 'image', 'file', 'voice', 'system'],
      allowNull: false,
      defaultValue: 'text'
    },
    content: {
      type: 'TEXT',
      allowNull: true
    },
    file_url: {
      type: 'VARCHAR(500)',
      allowNull: true
    },
    file_name: {
      type: 'VARCHAR(255)',
      allowNull: true
    },
    file_size: {
      type: 'INTEGER',
      allowNull: true
    },
    is_read: {
      type: 'BOOLEAN',
      defaultValue: false,
      allowNull: false
    },
    read_at: {
      type: 'DATETIME',
      allowNull: true
    },
    is_edited: {
      type: 'BOOLEAN',
      defaultValue: false,
      allowNull: false
    },
    edited_at: {
      type: 'DATETIME',
      allowNull: true
    },
    created_at: {
      type: 'DATETIME',
      allowNull: false,
      defaultValue: 'CURRENT_TIMESTAMP'
    },
    updated_at: {
      type: 'DATETIME',
      allowNull: false,
      defaultValue: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    }
  },
  indexes: [
    {
      name: 'messages_consultation_id_index',
      fields: ['consultation_id']
    },
    {
      name: 'messages_sender_id_index',
      fields: ['sender_id']
    },
    {
      name: 'messages_created_at_index',
      fields: ['created_at']
    },
    {
      name: 'messages_is_read_index',
      fields: ['is_read']
    }
  ]
};

module.exports = messagesSchema;
