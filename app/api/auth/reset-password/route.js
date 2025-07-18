import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { query } from '@/database/config/database';

export async function POST(request) {
  try {
    const { token, password } = await request.json();

    // Validasi input
    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token and password are required' },
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

    // Cari user dengan reset token yang valid
    const userResult = await query(
      `SELECT id, email, first_name, reset_token_expiry 
       FROM users 
       WHERE reset_token = $1 AND reset_token_expiry > NOW()`,
      [token]
    );

    if (userResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      );
    }

    const user = userResult.rows[0];

    // Hash password baru
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Update password dan hapus reset token
    await query(
      `UPDATE users 
       SET password_hash = $1, reset_token = NULL, reset_token_expiry = NULL, updated_at = NOW()
       WHERE id = $2`,
      [passwordHash, user.id]
    );

    return NextResponse.json({
      success: true,
      message: 'Password has been reset successfully. You can now login with your new password.'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
