import SignInForm from "./SignInForm";
import styles from './AccountFormsLayout.module.css';
import SignUpForm from "./SignUpForm";

function AccountFormsLayout()
{
    return (<div className={styles.container}>
        <div className={styles.section}>
            <SignInForm/>
        </div>
        <div className={styles.section}>
            <SignUpForm/>
        </div>
    </div>);
}

export default AccountFormsLayout;