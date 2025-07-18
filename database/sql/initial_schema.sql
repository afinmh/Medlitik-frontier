-- Medlitik Database Initial Schema for PostgreSQL
-- File: initial_schema.sql

-- Create database if not exists (run this separately)
-- CREATE DATABASE medlitik_dev WITH ENCODING 'UTF8' LC_COLLATE='en_US.UTF-8' LC_CTYPE='en_US.UTF-8';

-- Connect to the database first: \c medlitik_dev

-- Create ENUM types
CREATE TYPE gender_enum AS ENUM ('male', 'female', 'other');
CREATE TYPE user_role_enum AS ENUM ('patient', 'doctor', 'admin');
CREATE TYPE consultation_type_enum AS ENUM ('chat', 'voice', 'video');
CREATE TYPE consultation_status_enum AS ENUM ('pending', 'active', 'completed', 'cancelled', 'refunded');
CREATE TYPE payment_status_enum AS ENUM ('pending', 'paid', 'failed', 'refunded');
CREATE TYPE message_type_enum AS ENUM ('text', 'image', 'file', 'voice', 'system');

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    gender gender_enum,
    role user_role_enum NOT NULL DEFAULT 'patient',
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    verification_token VARCHAR(255),
    reset_password_token VARCHAR(255),
    reset_password_expires TIMESTAMP,
    last_login_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for users table
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_verification_token ON users(verification_token);

-- Doctors table
CREATE TABLE IF NOT EXISTS doctors (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    license_number VARCHAR(50) NOT NULL UNIQUE,
    specialization VARCHAR(255) NOT NULL,
    sub_specialization VARCHAR(255),
    experience_years INTEGER DEFAULT 0,
    education TEXT,
    certifications JSONB,
    bio TEXT,
    consultation_fee DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    rating DECIMAL(3,2) DEFAULT 0.00 CHECK (rating >= 0.00 AND rating <= 5.00),
    total_reviews INTEGER NOT NULL DEFAULT 0,
    is_available BOOLEAN NOT NULL DEFAULT TRUE,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    verified_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for doctors table
CREATE UNIQUE INDEX IF NOT EXISTS idx_doctors_user_id ON doctors(user_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_doctors_license_number ON doctors(license_number);
CREATE INDEX IF NOT EXISTS idx_doctors_specialization ON doctors(specialization);
CREATE INDEX IF NOT EXISTS idx_doctors_rating ON doctors(rating);
CREATE INDEX IF NOT EXISTS idx_doctors_availability ON doctors(is_available, is_verified);

-- Consultations table
CREATE TABLE IF NOT EXISTS consultations (
    id BIGSERIAL PRIMARY KEY,
    patient_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    doctor_id BIGINT NOT NULL REFERENCES doctors(id) ON DELETE CASCADE ON UPDATE CASCADE,
    consultation_type consultation_type_enum NOT NULL DEFAULT 'chat',
    status consultation_status_enum NOT NULL DEFAULT 'pending',
    chief_complaint TEXT NOT NULL,
    symptoms JSONB,
    medical_history TEXT,
    diagnosis TEXT,
    treatment_plan TEXT,
    prescription JSONB,
    follow_up_required BOOLEAN DEFAULT FALSE,
    follow_up_date TIMESTAMP,
    fee_amount DECIMAL(10,2) NOT NULL,
    payment_status payment_status_enum NOT NULL DEFAULT 'pending',
    payment_method VARCHAR(50),
    scheduled_at TIMESTAMP,
    started_at TIMESTAMP,
    ended_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for consultations table
CREATE INDEX IF NOT EXISTS idx_consultations_patient_id ON consultations(patient_id);
CREATE INDEX IF NOT EXISTS idx_consultations_doctor_id ON consultations(doctor_id);
CREATE INDEX IF NOT EXISTS idx_consultations_status ON consultations(status);
CREATE INDEX IF NOT EXISTS idx_consultations_scheduled_at ON consultations(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_consultations_payment_status ON consultations(payment_status);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
    id BIGSERIAL PRIMARY KEY,
    consultation_id BIGINT NOT NULL REFERENCES consultations(id) ON DELETE CASCADE ON UPDATE CASCADE,
    sender_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    message_type message_type_enum NOT NULL DEFAULT 'text',
    content TEXT,
    file_url VARCHAR(500),
    file_name VARCHAR(255),
    file_size INTEGER,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    read_at TIMESTAMP,
    is_edited BOOLEAN NOT NULL DEFAULT FALSE,
    edited_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for messages table
CREATE INDEX IF NOT EXISTS idx_messages_consultation_id ON messages(consultation_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);
CREATE INDEX IF NOT EXISTS idx_messages_is_read ON messages(is_read);

-- Specializations reference table
CREATE TABLE IF NOT EXISTS specializations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Insert specializations reference data
INSERT INTO specializations (name, description) VALUES
('Umum', 'Dokter Umum'),
('Jantung', 'Spesialis Jantung dan Pembuluh Darah'),
('Anak', 'Spesialis Anak'),
('Kandungan', 'Spesialis Kandungan dan Kebidanan'),
('Mata', 'Spesialis Mata'),
('THT', 'Spesialis Telinga Hidung Tenggorokan'),
('Kulit', 'Spesialis Kulit dan Kelamin'),
('Saraf', 'Spesialis Saraf'),
('Jiwa', 'Spesialis Kesehatan Jiwa'),
('Gigi', 'Spesialis Gigi dan Mulut')
ON CONFLICT (name) DO NOTHING;

-- Create function for updating updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for automatic updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_doctors_updated_at BEFORE UPDATE ON doctors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_consultations_updated_at BEFORE UPDATE ON consultations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_messages_updated_at BEFORE UPDATE ON messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_specializations_updated_at BEFORE UPDATE ON specializations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
