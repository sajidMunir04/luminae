import { ChangeEvent, FormEvent, useState } from "react";
import FormButton from "./FormButton";
import FormExternalServiceButton from "./FormExternalServiceButton";
import FormHeading from "./FormHeading";
import FormInputField from "./FormInputField";
import FormOrSection from "./FormOrSection";
import styles from './SignInForm.module.css';
import { SignInCredentials, emailRegex } from "../lib/definitions";
import router from "next/router";
import { headers } from "next/headers";


function SignInForm()
{
    const [email,setEmail] = useState<string>();
    const [password,setPassword] = useState<string>();
    const [isUserValid,setUserStatus] = useState<boolean>(false);

    const handleEmailInput = (e : ChangeEvent<HTMLInputElement>) => {
        if (emailRegex.test(e.target.value)) {
            async function checkUserExists() {
                const response  = await fetch('api/doesUserExists',{
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json"
                                                }
                                                });

                if (response.ok) {

                }
            }

            checkUserExists();
        }     
    }

    const handlePasswordInput = (e : ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    async function onSubmit(e: FormEvent<HTMLFormElement>) {

        if (!isUserValid)
        {
            return;
        }

        const credentials : SignInCredentials ={
            email: email as string,
            password: password as string
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

      return (<form method="post" action={'api/auth/signIn'} onSubmit={onSubmit} className={styles.container}>
      <FormHeading heading="Sign In"/>
      <FormInputField name="username" fieldName="Email" isRequired={true} placeholder="Email Address" type="email" handleChange={handleEmailInput}/>
      <FormInputField name="password" fieldName="Password" isRequired={true} placeholder="password" type="password" handleChange={handlePasswordInput}/>
      <div className={styles.checkBoxAndLinkContainer}>
          <div className={styles.checkboxWithText}>
              <input className={styles.checkBox} type="checkbox"/>
              <label>Remember for 30 days</label>
          </div>
          <div>
              <a className={styles.forgotPasswordLink} href="auth/account">Forgot password?</a>
          </div>
      </div>
      <div className={styles.formButton}>
          <FormButton text="SIGN IN"/>
      </div>
      <div className={styles.noAccountContainer}>
          <p>Don't have an account?</p>
          <a className={styles.signUpButton} href="signup">Sign Up</a>
      </div>
      </form>);
}

export default SignInForm;