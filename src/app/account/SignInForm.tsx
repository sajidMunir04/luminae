
import { ChangeEvent, useState } from "react";
import FormButton from "./FormButton";
import FormExternalServiceButton from "./FormExternalServiceButton";
import FormHeading from "./FormHeading";
import FormInputField from "./FormInputField";
import FormOrSection from "./FormOrSection";
import styles from './SignInForm.module.css';
import { emailRegex } from "../lib/definitions";
import { signIn } from "../../../auth";
import credentials from "next-auth/providers/credentials";

interface FormData {
    email: {},
    password: {}
}

function SignInForm()
{
    const [email,setEmail] = useState<string>();
    const [password,setPassword] = useState<string>();


    const handleEmailInput = (e : ChangeEvent<HTMLInputElement>) => {
        if (emailRegex.test(e.target.value)) {
            setEmail(e.target.value);
        }     
    }

    const handlePasswordInput = (e : ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault()
        await signIn('credentials', {
          redirect: true,
          email: email,
          password: password,
        }).then((response) => console.log(response));
      }

      return (
        <form
          action={async (formData) => {
            await signIn("credentials", formData)
          }}
        >
          <label>
            Email
            <input name="email" type="email" />
          </label>
          <label>
            Password
            <input name="password" type="password" />
          </label>
          <button>Sign In</button>
        </form>
      )
}

export default SignInForm;