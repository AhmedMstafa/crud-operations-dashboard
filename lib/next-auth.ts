import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';

interface Credentials {
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Email',

      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          required: true,
          placeholder: 'GridGuru@webmail.io',
        },
        password: {
          label: 'Password',
          type: 'password',
          required: true,
          placeholder: '0000',
        },
      },

      async authorize(credentials: Credentials | undefined) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(credentials.email)) {
          return null;
        }

        if (credentials.password.length < 4) {
          return null;
        }

        const user: User = {
          id: '1',
          name: 'GridGuru',
          email: 'GridGuru@webmail.io',
          password: '0000',
        };

        if (
          credentials.email === user.email &&
          credentials.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 1 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
