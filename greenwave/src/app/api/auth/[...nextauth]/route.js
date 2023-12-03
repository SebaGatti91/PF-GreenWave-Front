import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import Auth0Provider from "next-auth/providers/auth0";


const handler = NextAuth({
  providers: [
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
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER_BASE_URL
    })
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
