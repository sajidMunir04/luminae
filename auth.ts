import NextAuth, { CredentialsSignin, User } from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "./src/app/lib/db";
import adapter from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials";
import {z} from "zod";
import bcrypt from "bcrypt";

async function getUser(email: string) : Promise<User | undefined> {
  try {
    const response = await fetch('api/doesUserExits', {
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
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [Credentials({
      async authorize(credentials) {
          const parsedCredentials = z.object({email: z.string().email(),password: z.string().min(6)}).safeParse(credentials);
          if (parsedCredentials.success) {
            const {email, password} = parsedCredentials.data;
            const user = await getUser(email) as User;
            if (!user) {
              console.log("User does not exists");
              return null;
            }

            const passwordMatched = await bcrypt.compare(password,user.id); 
            if (passwordMatched)
              return user;

          }

          return null;
      }
  })]

});