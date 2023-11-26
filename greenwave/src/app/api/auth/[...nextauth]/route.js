import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {

        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        // Hacer aquí la solicitud a la base de datos y verificar las credenciales
        // const dbUser = await yourDatabaseQuery(credentials.email, credentials.password);

        // Verificación de la contraseña, recuerda encriptar las contraseñas usando bcrypt
        // if (!comparePasswords(credentials.password, dbUser.password)) {
        //   return null;
        // }

        return { email: credentials.email}
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