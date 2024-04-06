import FormButton from "./FormButton";
import FormExternalServiceButton from "./FormExternalServiceButton";
import FormHeading from "./FormHeading";
import FormInputField from "./FormInputField";
import FormOrSection from "./FormOrSection";
import styles from './SignUpForm.module.css';

function SignUpForm()
{
    return (<form className={styles.container}>
        <FormHeading heading="Sign Up"/>
        <FormInputField fieldName="Name" isRequired={true} placeholder="Full Name" type="text"/>
        <FormInputField fieldName="Email" isRequired={true} placeholder="Email Address" type="email"/>
        <FormInputField fieldName="Password" isRequired={true} placeholder="password" type="password"/>
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
    </form>);
}

export default SignUpForm;