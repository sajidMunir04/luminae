import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    newUser: 'auth/signup',
    verifyRequest: 'auth/verifyRequest',
    error: 'auth/error',
    signOut: 'auth/signOut',
    signIn: 'auth/login'
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;