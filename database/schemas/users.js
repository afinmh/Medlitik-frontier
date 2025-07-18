/**
 * Users Table Schema
 * Skema untuk tabel pengguna aplikasi Medlitik
 */

const usersSchema = {
  tableName: 'users',
  columns: {
    id: {
      type: 'BIGINT',
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    email: {
      type: 'VARCHAR(255)',
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: 'VARCHAR(255)',
      allowNull: false
    },
    full_name: {
      type: 'VARCHAR(255)',
      allowNull: false
    },
    phone: {
      type: 'VARCHAR(20)',
      allowNull: true
    },
    date_of_birth: {
      type: 'DATE',
      allowNull: true
    },
    gender: {
      type: 'ENUM',
      values: ['male', 'female', 'other'],
      allowNull: true
    },
    role: {
      type: 'ENUM',
      values: ['patient', 'doctor', 'admin'],
      defaultValue: 'patient',
      allowNull: false
    },
    is_verified: {
      type: 'BOOLEAN',
      defaultValue: false,
      allowNull: false
    },
    verification_token: {
      type: 'VARCHAR(255)',
      allowNull: true
    },
    reset_password_token: {
      type: 'VARCHAR(255)',
      allowNull: true
    },
    reset_password_expires: {
      type: 'DATETIME',
      allowNull: true
    },
    last_login_at: {
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
      name: 'users_email_unique',
      unique: true,
      fields: ['email']
    },
    {
      name: 'users_role_index',
      fields: ['role']
    },
    {
      name: 'users_verification_token_index',
      fields: ['verification_token']
    }
  ]
};

module.exports = usersSchema;
