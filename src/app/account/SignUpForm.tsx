import React, { ChangeEvent, FormEvent, useState } from "react";
import FormButton from "./FormButton";
import FormExternalServiceButton from "./FormExternalServiceButton";
import FormHeading from "./FormHeading";
import FormInputField from "./FormInputField";
import FormOrSection from "./FormOrSection";
import styles from './SignUpForm.module.css';
import router from "next/router";
import { SignUpCredentials } from "../lib/definitions";


function SignUpForm()
{
    const [name,setName] = useState<string>('');
    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');

    const handleName = (e:ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleEmail = (e:ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e:ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        const signUpData : SignUpCredentials ={
            name: name,
            email: email,
            password: password
        }
		e.preventDefault();
		const formElement = e.target as HTMLFormElement;
		const response = await fetch(formElement.action, {
			method: formElement.method,
			body: JSON.stringify(signUpData),
			headers: {
				"Content-Type": "application/json"
			}
		});
		if (response.ok) {
			router.push("/");
		}
	}

    return (<form className={styles.container} action={"/api/auth/signUp"} method={"POST"} onSubmit={onSubmit}>
        <FormHeading heading="Sign Up"/>
        <FormInputField fieldName="Name" isRequired={true} placeholder="Full Name" type="text" handleChange={handleName}/>
        <FormInputField fieldName="Email" isRequired={true} placeholder="Email Address" type="email" handleChange={handleEmail}/>
        <FormInputField fieldName="Password" isRequired={true} placeholder="password" type="password" handleChange={handlePassword}/>
        <div className={styles.checkBoxAndLinkContainer}>
            <div className={styles.checkboxWithText}>
                <input className={styles.checkBox} type="checkbox"/>
                <label>I accept the
            <a href="/account">terms and conditions</a></label>
            </div>
        </div>
        <div className={styles.formButton}>
            <FormButton text="SIGN UP"/>
        </div>
        <div className={styles.accountExistsContainer}>
            <p className={styles.accountExistsText}>Account already exists?</p>
            <a className={styles.loginButton} href="signIn">Sign In</a>
        </div>
    </form>);
}

export default SignUpForm;