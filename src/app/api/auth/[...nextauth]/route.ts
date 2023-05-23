import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const { GOOGLE_ADMIN_EMAIL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID as string,
      clientSecret: GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }: any) {
      if (account.provider === 'google') {
        return profile.email_verified && profile.email === GOOGLE_ADMIN_EMAIL;
      }
      return false; // Do different verification for other providers that don't have `email_verified`
    },
  },
});

export { handler as GET, handler as POST };
