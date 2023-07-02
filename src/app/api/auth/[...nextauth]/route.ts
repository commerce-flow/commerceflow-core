import NextAuth, { User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

const credentialsProvider = CredentialsProvider({
  id: 'cred',
  name: 'credentials',
  credentials: {
    username: {
      label: 'Email',
      type: 'text',
      placeholder: 'johndoe@email.com',
    },
    password: { label: 'Password', type: 'password' },
  },
  async authorize(credentials, req) {
    try {
      /* const decodedPass = Buffer.from(credentials.password, 'base64').toString();

      const resp = await axiosDefaultInstance.post('/auth/login', {
        username: credentials.username,
        password: decodedPass,
      });

      const { user, token } = resp.data.data;

      return { ...user }; */
      return { id: '' };
    } catch (e) {
      return null;
    }
  },
});

const jwt = ({ token, user }: Record<string, unknown>) => {
  return {};
};

const handler = NextAuth({
  providers: [credentialsProvider],
  pages: {
    signIn: '/admin/auth/login',
  },
  callbacks: {
    jwt,
  },
  session: {
    strategy: 'jwt',
  },
});

export { handler as GET, handler as POST };
