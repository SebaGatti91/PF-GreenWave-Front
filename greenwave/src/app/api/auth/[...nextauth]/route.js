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
            return Promise.resolve(null);
          }
        } catch (error) {
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

  // callbacks: {
  //   async session({ session, token }) {
  //     // Agregar información del token a la sesión
  //     session.user = token;
  //     return session;
  //   },
  //   // async getProviders({ providers }) {
  //   //   // Devuelve la lista de proveedores disponibles
  //   //   return providers;
  //   // },
    async signIn({ user, account, profile, email, credentials }) {
      // Redirige a la página de inicio después de iniciar sesión con éxito
      return Promise.resolve('/'); // Puedes cambiar '/' por la ruta deseada
    },
  // },

  pages: {
     signIn: "/login",
   },

});

export { handler as GET, handler as POST };