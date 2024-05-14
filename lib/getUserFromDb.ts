import { SignInCredentials } from "@/app/lib/definitions";


 async function getUserFromDb(email,password) {
    const credentials : SignInCredentials = {
        email: email,
        password: password
    }
    const response = await fetch('/api/auth/signIn', {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    return data;
 }


 export default getUserFromDb;