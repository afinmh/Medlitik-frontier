import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { query } from '@/database/config/connection';

export async function POST(request) {
  try {
    const { email, password, rememberMe } = await request.json();

    // Validasi input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Cari user di database
    const userResult = await query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (userResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const user = userResult.rows[0];

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Update last login
    await query(
      'UPDATE users SET last_login_at = NOW(), updated_at = NOW() WHERE id = $1',
      [user.id]
    );

    // Prepare user data (exclude sensitive information)
    const userData = {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      phone: user.phone,
      role: user.role,
      userType: user.role === 'doctor' ? 'doctor' : 'patient',
      createdAt: user.created_at
    };

    // Simple response without token/cookie
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: userData
    });

    console.log('Login successful for user:', userData.email, 'Role:', userData.role);

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
