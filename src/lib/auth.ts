import {
  getServerSession as nextAuthGetServerSession,
  type AuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getMe } from "@/actions/get-me";
import { login } from "@/actions/login";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 60 * 60, // 1 hour
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        if (!credentials) return null;
        const { success, token } = await login(credentials);

        if (!success) return null;
        return { token };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      return { ...token, ...user };
    },
    async session({ session, token: { token } }) {
      // Send properties to the client, like an access_token and user id from a provider.
      const { data: user } = await getMe(token);
      if (!user) {
        throw new Error("Failed to get user");
      }
      return { ...session, user, token };
    },
  },
};

export async function getServerSession() {
  return await nextAuthGetServerSession(authOptions);
}
