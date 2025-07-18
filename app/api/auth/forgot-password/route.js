import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { query } from '@/database/config/connection';
import nodemailer from 'nodemailer';

// Konfigurasi email transporter
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request) {
  try {
    const { email } = await request.json();

    // Validasi input
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
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

    // Cek apakah email terdaftar
    const userResult = await query(
      'SELECT id, first_name, last_name FROM users WHERE email = $1',
      [email]
    );

    if (userResult.rows.length === 0) {
      // Untuk keamanan, kita tetap return success meskipun email tidak ditemukan
      return NextResponse.json({
        success: true,
        message: 'If the email exists in our system, a reset link has been sent.'
      });
    }

    const user = userResult.rows[0];

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    // Simpan reset token ke database
    await query(
      `UPDATE users 
       SET reset_token = $1, reset_token_expiry = $2, updated_at = NOW() 
       WHERE id = $3`,
      [resetToken, resetTokenExpiry, user.id]
    );

    // Buat reset URL
    const resetUrl = `${process.env.APP_URL}/auth/reset-password?token=${resetToken}`;

    // Template email
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Reset Password - Medlitik</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #3570ff, #6ad7e5); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #3570ff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔒 Reset Password</h1>
            <p>Medlitik - Platform Kesehatan Digital</p>
          </div>
          <div class="content">
            <h2>Halo ${user.first_name}!</h2>
            <p>Kami menerima permintaan untuk mereset password akun Medlitik Anda.</p>
            <p>Klik tombol di bawah ini untuk membuat password baru:</p>
            <p style="text-align: center;">
              <a href="${resetUrl}" class="button">Reset Password</a>
            </p>
            <p><strong>Atau copy dan paste link berikut ke browser Anda:</strong></p>
            <p style="word-break: break-all; background: #fff; padding: 10px; border-radius: 5px; border: 1px solid #ddd;">
              ${resetUrl}
            </p>
            <p><strong>Penting:</strong></p>
            <ul>
              <li>Link ini akan kedaluwarsa dalam 1 jam</li>
              <li>Jika Anda tidak meminta reset password, abaikan email ini</li>
              <li>Pastikan untuk membuat password yang kuat dan unik</li>
            </ul>
          </div>
          <div class="footer">
            <p>© 2025 Medlitik. Seluruh hak cipta dilindungi.</p>
            <p>Email ini dikirim secara otomatis, mohon tidak membalas.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Kirim email
    try {
      await transporter.sendMail({
        from: `"Medlitik Support" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Reset Password - Medlitik',
        html: emailHtml,
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Hapus token jika email gagal dikirim
      await query(
        'UPDATE users SET reset_token = NULL, reset_token_expiry = NULL WHERE id = $1',
        [user.id]
      );
      
      return NextResponse.json(
        { error: 'Failed to send reset email. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Reset password link has been sent to your email.'
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
