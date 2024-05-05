import { ChangeEvent, useState } from "react";
import FormButton from "./FormButton";
import FormExternalServiceButton from "./FormExternalServiceButton";
import FormHeading from "./FormHeading";
import FormInputField from "./FormInputField";
import FormOrSection from "./FormOrSection";
import styles from './SignInForm.module.css';
import type {GetServerSidePropsContext,InferGetServerSidePropsType,} from "next"
import { getCsrfToken } from "next-auth/react"

function SignInForm({
    csrfToken,
  }: InferGetServerSidePropsType<typeof getServerSideProps>)
{
    const [email,setEmail] = useState<string>();
    const [password,setPassword] = useState<string>();

    const regex : RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    let emailValue : string = '';

    const handleEmailInput = (e : ChangeEvent<HTMLInputElement>) => {
        if (regex.test(e.target.value)) {
            const checkIfUserExists = async() => {
                const response = await fetch('api/doesUserExists/' + e.target.value);
                const data = await response.json()
                const result : boolean = JSON.parse(data);

                if (!result)
                {
                    setEmail(e.target.value);
                }
                else {
                    setEmail('');
                }
            } 

            checkIfUserExists();
        }
    }

    const handlePasswordInput = (e : ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const loginUser = async() => {
        const response = await fetch('api/')
    }

    return (<form method="post" className={styles.container} action={"/api/auth/callback/credentials"}>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const csrfToken = await getCsrfToken()
    return {
      props: { csrfToken },
    }
}

export default SignInForm;