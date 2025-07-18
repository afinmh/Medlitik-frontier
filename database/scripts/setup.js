/**
 * Database Setup Script
 * Script untuk membuat tabel dan struktur database
 */

import { query, getClient } from '../config/connection.js';

async function setupDatabase() {
  console.log('🚀 Starting database setup...');
  
  try {
    // Create ENUM types
    console.log('📋 Creating ENUM types...');
    
    await query(`
      DO $$ BEGIN
        CREATE TYPE gender_enum AS ENUM ('male', 'female', 'other');
      EXCEPTION
        WHEN duplicate_object THEN
          RAISE NOTICE 'gender_enum already exists, skipping...';
      END $$;
    `);
    
    await query(`
      DO $$ BEGIN
        CREATE TYPE user_role_enum AS ENUM ('patient', 'doctor', 'admin');
      EXCEPTION
        WHEN duplicate_object THEN
          RAISE NOTICE 'user_role_enum already exists, skipping...';
      END $$;
    `);

    // Create users table
    console.log('👥 Creating users table...');
    
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id BIGSERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        date_of_birth DATE,
        gender gender_enum,
        role user_role_enum DEFAULT 'patient' NOT NULL,
        is_verified BOOLEAN DEFAULT false NOT NULL,
        verification_token VARCHAR(255),
        reset_password_token VARCHAR(255),
        reset_password_expires TIMESTAMP,
        last_login_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `);

    // Create indexes
    await query(`
      CREATE UNIQUE INDEX IF NOT EXISTS users_email_unique ON users(email);
    `);

    await query(`
      CREATE INDEX IF NOT EXISTS users_role_idx ON users(role);
    `);

    // Create doctors table
    console.log('👨‍⚕️ Creating doctors table...');
    
    await query(`
      CREATE TABLE IF NOT EXISTS doctors (
        id BIGSERIAL PRIMARY KEY,
        user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        specialization VARCHAR(255),
        license_number VARCHAR(100),
        experience_years INTEGER DEFAULT 0,
        education TEXT,
        bio TEXT,
        consultation_fee DECIMAL(10,2),
        verification_status VARCHAR(20) DEFAULT 'pending',
        rating DECIMAL(3,2) DEFAULT 0.00,
        total_consultations INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `);

    // Create consultations table
    console.log('💬 Creating consultations table...');
    
    await query(`
      CREATE TABLE IF NOT EXISTS consultations (
        id BIGSERIAL PRIMARY KEY,
        patient_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        doctor_id BIGINT NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
        consultation_date TIMESTAMP NOT NULL,
        status VARCHAR(20) DEFAULT 'scheduled',
        type VARCHAR(20) DEFAULT 'online',
        notes TEXT,
        diagnosis TEXT,
        prescription TEXT,
        fee DECIMAL(10,2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `);

    // Create messages table
    console.log('📨 Creating messages table...');
    
    await query(`
      CREATE TABLE IF NOT EXISTS messages (
        id BIGSERIAL PRIMARY KEY,
        consultation_id BIGINT NOT NULL REFERENCES consultations(id) ON DELETE CASCADE,
        sender_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        message_text TEXT NOT NULL,
        message_type VARCHAR(20) DEFAULT 'text',
        attachment_url VARCHAR(500),
        is_read BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `);

    // Create specializations table
    console.log('🏥 Creating specializations table...');
    
    await query(`
      CREATE TABLE IF NOT EXISTS specializations (
        id BIGSERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        icon_url VARCHAR(500),
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `);

    // Insert default specializations
    console.log('📋 Inserting default specializations...');
    
    await query(`
      INSERT INTO specializations (name, description) VALUES
      ('Dokter Umum', 'Pelayanan kesehatan umum dan konsultasi dasar'),
      ('Spesialis Jantung', 'Spesialis penyakit jantung dan pembuluh darah'),
      ('Spesialis Kulit', 'Spesialis penyakit kulit dan kelamin'),
      ('Spesialis Mata', 'Spesialis penyakit mata dan gangguan penglihatan'),
      ('Spesialis THT', 'Spesialis telinga, hidung, dan tenggorokan'),
      ('Psikolog', 'Konseling dan terapi psikologi')
      ON CONFLICT (name) DO NOTHING;
    `);

    // Create admin user
    console.log('👑 Creating admin user...');
    
    const bcrypt = await import('bcryptjs');
    const adminPassword = await bcrypt.hash('admin123', 12);
    
    await query(`
      INSERT INTO users (
        email, password_hash, first_name, last_name, role, is_verified
      ) VALUES (
        'admin@medlitik.com', $1, 'Admin', 'Medlitik', 'admin', true
      ) ON CONFLICT (email) DO NOTHING;
    `, [adminPassword]);

    console.log('✅ Database setup completed successfully!');
    console.log('🔑 Admin credentials:');
    console.log('   Email: admin@medlitik.com');
    console.log('   Password: admin123');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    throw error;
  }
}

// Run setup if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  setupDatabase()
    .then(() => {
      console.log('🎉 Setup complete!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Setup failed:', error);
      process.exit(1);
    });
}

export default setupDatabase;
