# PostgreSQL Setup Guide for Medlitik

## 📋 Prerequisites

1. **Install PostgreSQL**
   - Download dari [postgresql.org](https://www.postgresql.org/download/)
   - Atau menggunakan package manager:
     ```bash
     # Windows (dengan Chocolatey)
     choco install postgresql

     # macOS (dengan Homebrew)
     brew install postgresql

     # Ubuntu/Debian
     sudo apt-get install postgresql postgresql-contrib
     ```

2. **Install Node.js Dependencies**
   ```bash
   npm install sequelize sequelize-cli pg pg-hstore bcrypt dotenv
   ```

## 🚀 Setup Database

### 1. Create Database
```sql
-- Connect ke PostgreSQL sebagai superuser
psql -U postgres

-- Create database
CREATE DATABASE medlitik_dev WITH ENCODING 'UTF8' LC_COLLATE='en_US.UTF-8' LC_CTYPE='en_US.UTF-8';
CREATE DATABASE medlitik_test WITH ENCODING 'UTF8' LC_COLLATE='en_US.UTF-8' LC_CTYPE='en_US.UTF-8';

-- Create user (optional)
CREATE USER medlitik_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE medlitik_dev TO medlitik_user;
GRANT ALL PRIVILEGES ON DATABASE medlitik_test TO medlitik_user;

-- Exit psql
\q
```

### 2. Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Edit .env file
DB_HOST=localhost
DB_PORT=5432
DB_NAME=medlitik_dev
DB_USER=postgres
DB_PASSWORD=your_password
```

### 3. Run Migrations
```bash
# Create database (jika belum dibuat)
npm run db:create

# Run all migrations
npm run db:migrate

# Seed initial data
npm run db:seed

# Check migration status
npm run db:migrate:status
```

## 📊 Database Schema

### Tables Created:
1. **users** - User accounts (patients, doctors, admins)
2. **doctors** - Doctor profiles and certifications
3. **specializations** - Medical specializations reference
4. **consultations** - Medical consultations data
5. **messages** - Chat messages in consultations

### PostgreSQL Features Used:
- **ENUM Types** - For constrained values (gender, role, status)
- **JSONB** - For complex data (certifications, symptoms)
- **Triggers** - For auto-updating timestamps
- **Foreign Keys** - For data integrity
- **Indexes** - For query performance

## 🛠️ Management Commands

```bash
# Database Creation
npm run db:create          # Create database
npm run db:drop            # Drop database

# Migrations
npm run db:migrate         # Run pending migrations
npm run db:migrate:undo    # Rollback last migration
npm run db:migrate:status  # Check migration status

# Seeders
npm run db:seed           # Run all seeders
npm run db:seed:undo      # Undo all seeders

# Utility Commands
npm run db:fresh          # Drop, create, migrate, and seed
npm run db:reset          # Rollback all, migrate, and seed
```

## 🔧 Troubleshooting

### Common Issues:

1. **Connection Error**
   ```
   Error: password authentication failed for user "postgres"
   ```
   **Solution:** Check your .env file and PostgreSQL password

2. **Database Does Not Exist**
   ```
   Error: database "medlitik_dev" does not exist
   ```
   **Solution:** Run `npm run db:create` first

3. **Permission Denied**
   ```
   Error: permission denied for relation
   ```
   **Solution:** Grant proper permissions to your database user

### PostgreSQL Service Commands:

```bash
# Windows
net start postgresql
net stop postgresql

# macOS (with Homebrew)
brew services start postgresql
brew services stop postgresql

# Linux (systemd)
sudo systemctl start postgresql
sudo systemctl stop postgresql
sudo systemctl status postgresql
```

## 📝 Notes

- Default PostgreSQL port: 5432
- Default superuser: postgres
- Database encoding: UTF8
- Timezone: Asia/Jakarta (+07:00)
- All timestamps use TIMESTAMP WITH TIME ZONE
