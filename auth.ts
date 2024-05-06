import { User } from "next-auth"
import clientPromise from "./src/app/lib/db";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials"
import type { Provider } from "next-auth/providers"
import { signInSchema } from "./lib/zod";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

async function getUser(email: string) : Promise<User | undefined> {
  try {
    console.log(email);
    const response = await fetch('api/doesUserExists', {
      method: "POST",
      body: email
    })
    const data = await response.json();
    return data;
  }
  catch (error){
    console.error("Failed to fetch user",error);

  }
}

const providers : Provider[] = [Credentials({
  credentials: {
    email: {},
    password: {}
  },

  authorize : async (credentials) => {
    let user : User = {};
    
    const { email, password } = await signInSchema.parseAsync(credentials)

    // logic to salt and hash password
    const pwHash = credentials.password;

    // logic to verify if user exists
    user = await getUser(credentials.email as string) as User;

    if (!user) {
      // No user found, so this is their first attempt to login
      // meaning this is also the place you could do registration
      throw new Error("User not found.");
    }

    // return user object with the their profile data
    return user;
  }
})]


export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider()
    return { id: providerData.id, name: providerData.name }
  } else {
    return { id: provider.id, name: provider.name }
  }
})
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers,
  pages: {
    signIn: 'auth/signIn'
  }
});