import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { appRouter } from '../../../../server/routers/_app';
import { TRPCError } from '@trpc/server';

const credentialsProvider = CredentialsProvider({
  id: 'cred',
  name: 'credentials',
  credentials: {
    email: {
      label: 'Email',
      type: 'text',
      placeholder: 'johndoe@email.com',
    },
    password: { label: 'Password', type: 'password' },
  },
  async authorize(credentials, req) {
    try {
      if (credentials?.email == null || credentials.password == null) {
        throw new Error('Email and Password not provided!');
      }
      const caller = appRouter.createCaller({
        session: null,
        platform: undefined,
      });

      const user = await caller.auth.login({ email: credentials?.email, password: credentials?.password });
      return user;
    } catch (cause) {
      if (cause instanceof TRPCError) {
        // log error
        throw new Error(cause.message);
      }
      return null;
    }
  },
});

const jwt = ({ token, user, account }: any) => {
  if (account && user) {
    token.user = user;
    return token;
  }
  return token;
};

const handler = NextAuth({
  providers: [credentialsProvider],
  pages: {
    signIn: '/admin/auth/login',
  },
  callbacks: {
    jwt,
    session: ({ session, token, user }: any): any => {
      session.user = token.user;
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
});

export { handler as GET, handler as POST };
