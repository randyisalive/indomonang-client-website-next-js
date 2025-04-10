import { checkPassword } from "@/app/function/decryptor";
import { serialize } from "cookie";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const api = process.env.BASE_URL || null;

        const json_data = {
          action: "select",
          entity_id: 154,
          filters: { 2616: credentials.email },
          select_fields: "2616,2615,2614,2630,2637,2628",
        };

        try {
          const response = await fetch(api, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(json_data),
          });

          if (!response.ok) {
            throw new Error("Failed to fetch API data");
          }

          const data = await response.json();

          // Construct the user object based on API response

          if (data) {
            const password = data.data[0][2615];
            const password_form = credentials.password;
            const booleanPassword = await checkPassword(
              password_form,
              password
            );
            if (booleanPassword) {
              const user_data = {
                id: data.data[0].id,
                email: data.data[0][2616],
                username: data.data[0][2614],
                role: data.data[0][2628],
              };
              return user_data; // Successful login returns the user object
            } else {
              return null; // Return null if login fails
            }
          }
        } catch (e) {
          console.error("Error in authorize function:", e);
          return null; // Return null if an error occurs
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 Days sessions
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user; // Store the user data in the JWT
        // Save token in a cookie
        const serializedCookie = serialize("session-token", token.user.id, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
          maxAge: 30 * 24 * 60 * 60, // 30 days
        });
        token.setCookie = serializedCookie;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user; // Attach the token's user to the session
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/",
    error: "/auth/error", // Redirect here for errors
    signOut: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
