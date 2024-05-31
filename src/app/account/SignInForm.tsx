import { ChangeEvent, FormEvent, useState } from "react";
import FormButton from "./FormButton";
import FormExternalServiceButton from "./FormExternalServiceButton";
import FormHeading from "./FormHeading";
import FormInputField from "./FormInputField";
import FormOrSection from "./FormOrSection";
import styles from './SignInForm.module.css';
import { SignInCredentials, emailRegex } from "../lib/definitions";
import router from "next/router";
import Link from "next/link";

enum EmailState {
    Unchecked,
    Invalid,
    Valid
}


function SignInForm()
{
    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [userStatus,setUserStatus] = useState<EmailState>(EmailState.Unchecked);
    

    const handleEmailInput = (e : ChangeEvent<HTMLInputElement>) => {
        if (emailRegex.test(e.target.value)) {
            setEmail(e.target.value);
            const email = e.target.value;
            async function checkUserExists() {
                const response  = await fetch('/api/auth/doesUserExists',{
                                                method: "POST",
                                                headers: {"Content-Type": "application/json"},
                                                body: email,
                                                });
                if (response.ok) {  
                    setUserStatus(EmailState.Valid);
                }
                else {
                    setUserStatus(EmailState.Invalid);
                }
            }

            checkUserExists();
        }     
    }

    const handlePasswordInput = (e : ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    async function onSubmit(e: FormEvent<HTMLFormElement>) {

        /*
        if (userStatus === EmailState.Invalid)
            return null;
        */
        const credentials : SignInCredentials ={
            email: email,
            password: password
        }
		e.preventDefault();
		const formElement = e.target as HTMLFormElement;
		const response = await fetch(formElement.action, {
			method: formElement.method,
			body: JSON.stringify(credentials),
			headers: {
				"Content-Type": "application/json"
			}
		});
		if (response.ok) {
			router.push("/");
		} else {
			console.log("Error Occured!");
		}
	}

      return (<form method="post" action={'/api/auth/signIn'} onSubmit={onSubmit} className={styles.container}>
      <FormHeading heading="Sign In"/>
      <FormInputField name="username" fieldName="Email" isRequired={true} placeholder="Email Address" type="email" handleChange={handleEmailInput}/>
      {userStatus === EmailState.Invalid && <p>User does not exists</p>}
      <FormInputField name="password" fieldName="Password" isRequired={true} placeholder="password" type="password" handleChange={handlePasswordInput}/>
      <div className={styles.checkBoxAndLinkContainer}>
          <div className={styles.checkboxWithText}>
              <input className={styles.checkBox} type="checkbox"/>
              <label>Remember for 30 days</label>
          </div>
          <div>
              <Link className={styles.forgotPasswordLink} href="auth/account">Forgot password?</Link>
          </div>
      </div>
      <div className={styles.formButton}>
          <FormButton text="SIGN IN"/>
      </div>
      <div className={styles.noAccountContainer}>
          <p>Don't have an account?</p>
          <Link className={styles.signUpButton} href="signup">Sign Up</Link>
      </div>
      </form>);
}

export default SignInForm;