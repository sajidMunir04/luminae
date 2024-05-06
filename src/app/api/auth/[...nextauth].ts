import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions = {
  pages: {
    signIn: '/auth/signIn', 
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verifyRequest', // (used for check email message)
    newUser: '/auth/signUp' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  providers: [
    CredentialsProvider({
      name:'Sign In',
      credentials: {
        username: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials,req) {
        const res = await fetch("api/auth/signIn", {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
        const user = await res.json()
  
        // If no error and we have user data, return it
        if (res.ok && user) {
          console.log("User Exists");
          return user;
        }
        else {
          console.log("User does not exists");
        }
        // Return null if user data could not be retrieved
        return null;
      }
    })
  ],
  session: {
    jwt: true,
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  database : process.env.MONGODB_URI
}

export default NextAuth(authOptions);