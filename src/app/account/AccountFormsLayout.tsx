import SignInForm from "./SignInForm";
import styles from './AccountFormsLayout.module.css';
import SignUpForm from "./SignUpForm";
import { useState } from "react";

enum forms {
    Login,
    Signup
}

function AccountFormsLayout()
{
    const[form,setForm] = useState(forms.Login);

    return (<div className={styles.container}>
        <div className={styles.section}>
            {form === forms.Login && <SignInForm onAccountExits={() => setForm(forms.Signup)}/>}
            {form === forms.Signup && <SignUpForm onAccountExists={() => setForm(forms.Login)}/>}
        </div>
    </div>);
}

export default AccountFormsLayout;