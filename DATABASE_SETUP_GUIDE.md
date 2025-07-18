# Database Setup Instructions

## 🛠️ Prerequisites

1. **PostgreSQL** harus sudah terinstall dan berjalan
2. **Node.js** versi 18 atau lebih baru
3. **npm** atau **yarn** package manager

## 📋 Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
```bash
# Copy file .env.example ke .env
cp .env.example .env

# Edit .env file dengan konfigurasi database Anda
```

### 3. Setup Database
```bash
# Jalankan script setup database
npm run db:setup
```

Script ini akan:
- ✅ Membuat ENUM types yang diperlukan
- ✅ Membuat semua tabel (users, doctors, consultations, messages, specializations)
- ✅ Membuat indexes untuk optimasi query
- ✅ Insert data default (specializations)
- ✅ Membuat admin user default

### 4. Verify Setup
```bash
# Jalankan development server
npm run dev
```

## 🔑 Default Admin Credentials

Setelah setup selesai, Anda bisa login sebagai admin dengan:
- **Email**: `admin@medlitik.com`
- **Password**: `admin123`

## 📊 Database Schema

### Users Table
```sql
id, email, password_hash, first_name, last_name, phone, 
date_of_birth, gender, role, is_verified, verification_token,
reset_password_token, reset_password_expires, last_login_at,
created_at, updated_at
```

### Doctors Table
```sql
id, user_id, specialization, license_number, experience_years,
education, bio, consultation_fee, verification_status, rating,
total_consultations, created_at, updated_at
```

### Consultations Table
```sql
id, patient_id, doctor_id, consultation_date, status, type,
notes, diagnosis, prescription, fee, created_at, updated_at
```

### Messages Table
```sql
id, consultation_id, sender_id, message_text, message_type,
attachment_url, is_read, created_at
```

### Specializations Table
```sql
id, name, description, icon_url, is_active, created_at, updated_at
```

## 🚨 Troubleshooting

### Error: "relation does not exist"
```bash
# Jalankan ulang setup database
npm run db:setup
```

### Error: "connect ECONNREFUSED"
- Pastikan PostgreSQL service berjalan
- Periksa konfigurasi koneksi di file .env

### Error: "authentication failed"
- Periksa username dan password PostgreSQL di file .env
- Pastikan user memiliki permission untuk create database

### Error: "Internal server error" saat register
- Pastikan database sudah di-setup dengan `npm run db:setup`
- Periksa logs server untuk detail error

## 🔄 Reset Database

Jika perlu reset database:
```bash
# Hapus semua tabel dan data
DROP DATABASE medlitik_dev;
CREATE DATABASE medlitik_dev;

# Jalankan ulang setup
npm run db:setup
```

## 📝 Manual Database Setup

Jika script otomatis gagal, Anda bisa setup manual:

1. Buat database PostgreSQL:
```sql
CREATE DATABASE medlitik_dev;
```

2. Jalankan file SQL:
```bash
psql -d medlitik_dev -f database/sql/initial_schema.sql
```

## 🎯 API Endpoints

Setelah setup selesai, endpoint berikut tersedia:
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Password reset

## 🔐 Security Notes

- Ganti JWT_SECRET di production dengan nilai yang aman
- Ganti password admin default setelah setup
- Gunakan HTTPS di production
- Setup proper database backup strategy
