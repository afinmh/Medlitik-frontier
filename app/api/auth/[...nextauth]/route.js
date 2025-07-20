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
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google' && profile?.email) {
        const userResult = await query(
          'SELECT id, role, first_name, last_name FROM users WHERE email = $1',
          [profile.email]
        );
        if (userResult.rows.length === 0) {
          // Redirect ke register dengan email Google (tanpa error JSON)
          return `/auth/register?email=${encodeURIComponent(profile.email)}`;
        } else {
          // Mapping data user ke user object agar bisa diakses di jwt
          user.id = userResult.rows[0].id;
          user.role = userResult.rows[0].role;
          user.first_name = userResult.rows[0].first_name;
          user.last_name = userResult.rows[0].last_name;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      // Mapping data user ke token
      if (user) {
        token.userId = user.id;
        token.role = user.role;
        token.first_name = user.first_name;
        token.last_name = user.last_name;
        token.name = ((user.first_name || '') + ' ' + (user.last_name || '')).trim();
      }
      return token;
    },
    async session({ session, token }) {
      // Mapping data token ke session
      session.user.id = token.userId;
      session.user.role = token.role;
      session.user.first_name = token.first_name;
      session.user.last_name = token.last_name;
      session.user.name = token.name;
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
