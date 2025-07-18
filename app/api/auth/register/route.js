import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '@/database/config/connection';

export async function POST(request) {
  try {
    const { firstName, lastName, email, password, phone, userType, agreeToTerms } = await request.json();

    // Validasi input
    if (!firstName || !lastName || !email || !password || !phone || !userType) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (!agreeToTerms) {
      return NextResponse.json(
        { error: 'You must agree to terms and conditions' },
        { status: 400 }
      );
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validasi password (minimal 8 karakter)
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Validasi user type
    if (!['patient', 'doctor'].includes(userType)) {
      return NextResponse.json(
        { error: 'Invalid user type' },
        { status: 400 }
      );
    }

    // Cek apakah email sudah terdaftar
    const existingUser = await query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Tentukan role berdasarkan userType
    const role = userType === 'doctor' ? 'doctor' : 'patient';

    // Insert user ke database
    const insertResult = await query(
      `INSERT INTO users (
        first_name, last_name, email, password_hash, phone, 
        role, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW()) 
      RETURNING id, email, first_name, last_name, phone, role, created_at`,
      [firstName, lastName, email, passwordHash, phone, role]
    );

    const newUser = insertResult.rows[0];

    // Jika user type adalah doctor, insert ke tabel doctors
    if (userType === 'doctor') {
      await query(
        `INSERT INTO doctors (
          user_id, specialization, license_number, experience_years, 
          verification_status, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, NOW(), NOW())`,
        [newUser.id, null, null, 0, 'pending']
      );
    }

    // Generate JWT token untuk auto-login
    const token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
        role: newUser.role,
        userType: userType
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    // Prepare user data (exclude sensitive information)
    const userData = {
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.first_name,
      lastName: newUser.last_name,
      phone: newUser.phone,
      role: newUser.role,
      userType: userType,
      createdAt: newUser.created_at
    };

    return NextResponse.json({
      success: true,
      message: userType === 'doctor' 
        ? 'Registration successful! Your account is pending verification.' 
        : 'Registration successful!',
      token,
      user: userData
    }, { 
      status: 201,
      headers: {
        'Set-Cookie': `token=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict`
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle specific database errors
    if (error.code === '23505') { // Unique violation
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
