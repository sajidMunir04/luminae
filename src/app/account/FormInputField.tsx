import { useState } from 'react';
import styles from './FormInputField.module.css';


function FormInputField(props)
{
    const [fieldSwitched,setSwitchState] = useState(false);

    function handleSwitch(){
        setSwitchState(!fieldSwitched);
    }

    return (<div className={styles.container}>
    <label>{props.fieldName}{props.isRequired && <span className={styles.redText}>*</span>}
    </label>
    <input required={props.isRequired} className={styles.inputField} type={props.inputType} placeholder={props.placeholder}/>
    <img className={styles.imgIcon} src='/aticon.png'/>
    </div>)
}

export default FormInputField;