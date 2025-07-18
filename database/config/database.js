/**
 * Database Configuration
 * Konfigurasi koneksi database untuk berbagai environment
 */

require('dotenv').config();

const config = {
  development: {
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME || 'medlitik_dev',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    logging: console.log,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      timezone: '+07:00' // WIB timezone
    }
  },
  
  test: {
    dialect: 'postgres',
    host: process.env.DB_HOST_TEST || 'localhost',
    port: parseInt(process.env.DB_PORT_TEST) || 5432,
    database: process.env.DB_NAME_TEST || 'medlitik_test',
    username: process.env.DB_USER_TEST || 'postgres',
    password: process.env.DB_PASSWORD_TEST || '',
    logging: false,
    dialectOptions: {
      timezone: '+07:00'
    }
  },
  
  production: {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    logging: false,
    pool: {
      max: 20,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      ssl: process.env.NODE_ENV === 'production' ? {
        require: true,
        rejectUnauthorized: false
      } : false,
      timezone: '+07:00'
    }
  }
};

module.exports = config;
