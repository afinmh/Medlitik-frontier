import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { query } from "@/database/config/connection";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === 'google' && profile?.email) {
        const userResult = await query(
          'SELECT id FROM users WHERE email = $1',
          [profile.email]
        );
        if (userResult.rows.length === 0) {
          // Redirect manual ke register dengan email Google
          return `/auth/register?email=${encodeURIComponent(profile.email)}`;
        }
      }
      return true;
    },
    async jwt({ token, account, profile }) {
      // Simpan data tambahan ke token jika perlu
      if (account && profile) {
        token.email = profile.email;
        token.picture = profile.picture;
        // Cari user di database berdasarkan email
        try {
          const userResult = await query(
            'SELECT id, role, first_name, last_name FROM users WHERE email = $1',
            [profile.email]
          );
          if (userResult.rows.length > 0) {
            token.role = userResult.rows[0].role;
            token.userId = userResult.rows[0].id;
            // Gunakan nama dari database jika ada
            const dbFirstName = userResult.rows[0].first_name || '';
            const dbLastName = userResult.rows[0].last_name || '';
            const dbName = (dbFirstName + ' ' + dbLastName).trim();
            token.name = dbName || profile.name;
          } else {
            // Jika user tidak ditemukan, fallback ke Google profile
            token.name = profile.name;
          }
        } catch (e) {
          console.error('JWT callback error:', e);
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Tambahkan data ke session client
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.image = token.picture;
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/register', // custom error page
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
