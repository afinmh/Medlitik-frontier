/**
 * Doctors Table Schema
 * Skema untuk tabel dokter dan informasi profesional
 */

const doctorsSchema = {
  tableName: 'doctors',
  columns: {
    id: {
      type: 'BIGINT',
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    user_id: {
      type: 'BIGINT',
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    license_number: {
      type: 'VARCHAR(50)',
      allowNull: false,
      unique: true
    },
    specialization: {
      type: 'VARCHAR(255)',
      allowNull: false
    },
    sub_specialization: {
      type: 'VARCHAR(255)',
      allowNull: true
    },
    experience_years: {
      type: 'INTEGER',
      allowNull: true,
      defaultValue: 0
    },
    education: {
      type: 'TEXT',
      allowNull: true
    },
    certifications: {
      type: 'JSON',
      allowNull: true
    },
    bio: {
      type: 'TEXT',
      allowNull: true
    },
    consultation_fee: {
      type: 'DECIMAL(10,2)',
      allowNull: false,
      defaultValue: 0.00
    },
    rating: {
      type: 'DECIMAL(3,2)',
      allowNull: true,
      defaultValue: 0.00,
      validate: {
        min: 0.00,
        max: 5.00
      }
    },
    total_reviews: {
      type: 'INTEGER',
      allowNull: false,
      defaultValue: 0
    },
    is_available: {
      type: 'BOOLEAN',
      defaultValue: true,
      allowNull: false
    },
    is_verified: {
      type: 'BOOLEAN',
      defaultValue: false,
      allowNull: false
    },
    verified_at: {
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
      name: 'doctors_user_id_unique',
      unique: true,
      fields: ['user_id']
    },
    {
      name: 'doctors_license_number_unique',
      unique: true,
      fields: ['license_number']
    },
    {
      name: 'doctors_specialization_index',
      fields: ['specialization']
    },
    {
      name: 'doctors_rating_index',
      fields: ['rating']
    },
    {
      name: 'doctors_availability_index',
      fields: ['is_available', 'is_verified']
    }
  ]
};

module.exports = doctorsSchema;
