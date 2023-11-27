import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      authorize: async (credentials, req) => {
        // Verificar que se proporcionaron credenciales
        if (!credentials || !credentials.email || !credentials.password) {
          return Promise.resolve(null); // O puedes manejar el error de otra manera si lo prefieres
        }

        try {
          const response = await axios.get("http://localhost:3001/users", {
            params: {
              email: credentials.email,
              password: credentials.password,
            },
          });

          if (response.status === 200) {
            const user = response.data;
            return Promise.resolve(user);
          } else {
            // Mostrar el mensaje de error recibido desde el backend
            return Promise.resolve({ error: response.data.message });
          }
        } catch (error) {
          // Mostrar el mensaje de error capturado durante la solicitud al backend
          console.error("Error during user validation:", error.message);
          return Promise.resolve(null);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],

  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
