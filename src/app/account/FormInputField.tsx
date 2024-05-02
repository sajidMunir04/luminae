import { useState } from 'react';
import styles from './FormInputField.module.css';


interface Props {
    fieldName: string,
    isRequired?: boolean,
    type: string,
    placeholder:string
}

function FormInputField(props : Props)
{
    const [fieldSwitched,setSwitchState] = useState(false);

    function handleSwitch(){
        setSwitchState(!fieldSwitched);
    }

    return (<div className={styles.container}>
    <label>{props.fieldName}{props.isRequired && <span className={styles.redText}>*</span>}
    </label>
    <input required={props.isRequired} className={styles.inputField} type={props.type} placeholder={props.placeholder}/>
    <img className={styles.imgIcon} src='/aticon.png'/>
    </div>)
}

export default FormInputField;