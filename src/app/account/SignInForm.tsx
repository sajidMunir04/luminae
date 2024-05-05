import { ChangeEvent, useState } from "react";
import FormButton from "./FormButton";
import FormExternalServiceButton from "./FormExternalServiceButton";
import FormHeading from "./FormHeading";
import FormInputField from "./FormInputField";
import FormOrSection from "./FormOrSection";
import styles from './SignInForm.module.css';
import type {GetServerSidePropsContext,InferGetServerSidePropsType,} from "next"
import { authenticate } from "../lib/actions";
import { signIn } from "next-auth/react";
import { useFormState, useFormStatus } from 'react-dom';

function SignInForm({credentials})
{
    const [email,setEmail] = useState<string>();
    const [password,setPassword] = useState<string>();

    const regex : RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    const handleEmailInput = (e : ChangeEvent<HTMLInputElement>) => {
        if (regex.test(e.target.value)) {
            setEmail(e.target.value);
        }
    }

    const handlePasswordInput = (e : ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const result = await signIn('credentials', {
          redirect: false,
          email,
          password,
        })
    
        if (!result?.error) {
          // Redirect user to dashboard or any other page
          window.location.href = '/'
        }
      }

    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    return (<form action={dispatch} method="post" onSubmit={handleSubmit} className={styles.container}>
        <FormHeading heading="Sign In"/>
        <FormInputField name="username" fieldName="Email" isRequired={true} placeholder="Email Address" type="email" handleChange={handleEmailInput}/>
        <FormInputField name="password" fieldName="Password" isRequired={true} placeholder="password" type="password" handleChange={handlePasswordInput}/>
        <div className={styles.checkBoxAndLinkContainer}>
            <div className={styles.checkboxWithText}>
                <input className={styles.checkBox} type="checkbox"/>
                <label>Remember for 30 days</label>
            </div>
            <div>
                <a className={styles.forgotPasswordLink} href="/account">Forgot password?</a>
            </div>
        </div>
        <div className={styles.formButton}>
            <FormButton text="SIGN IN"/>
        </div>
        <div className={styles.noAccountContainer}>
            <p>Don't have an account?</p>
            <a className={styles.signUpButton} href="/signup">Sign Up</a>
        </div>
    </form>);
}

export default SignInForm;