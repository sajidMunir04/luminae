import { signIn } from "next-auth/react";
import { AuthError } from "next-auth";


export async function authenticate(prevState: string, formData : FormData) {
    try {
        await signIn('credentials');
    }
    catch (error) {
        if (error instanceof AuthError){
            console.log(error);
        }

        throw error;
    }
}