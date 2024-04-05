import FormButton from "./FormButton";
import FormExternalServiceButton from "./FormExternalServiceButton";
import FormHeading from "./FormHeading";
import FormInputField from "./FormInputField";
import FormOrSection from "./FormOrSection";
import styles from './SignInForm.module.css';

function SignInForm()
{
    return (<form className={styles.container}>
        <FormHeading heading="Sign In"/>
        <FormInputField fieldName="Email" isRequired={true} placeholder="Email Address" type="email"/>
        <FormInputField fieldName="Password" isRequired={true} placeholder="password" type="password"/>
        <div>
            <div>
                <label><input type="checkbox"/>Remember for 30 days</label>
            </div>
            <div>
                <a href="/account">Forgot password?</a>
            </div>
        </div>
        <FormButton text="SIGN IN"/>
        <FormOrSection/>
        <FormExternalServiceButton/>
    </form>);
}

export default SignInForm;