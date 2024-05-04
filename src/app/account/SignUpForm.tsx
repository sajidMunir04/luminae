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
        <FormInputField fieldName="Name" isRequired={true} placeholder="Full Name" type="text" handleChange={function (e: any): void {
            throw new Error("Function not implemented.");
        } }/>
        <FormInputField fieldName="Email" isRequired={true} placeholder="Email Address" type="email" handleChange={function (e: any): void {
            throw new Error("Function not implemented.");
        } }/>
        <FormInputField fieldName="Password" isRequired={true} placeholder="password" type="password" handleChange={function (e: any): void {
            throw new Error("Function not implemented.");
        } }/>
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
            <a className={styles.loginButton} href="/login">Sign In</a>
        </div>
    </form>);
}

export default SignUpForm;