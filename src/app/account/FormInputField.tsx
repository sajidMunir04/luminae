import { useState } from 'react';
import styles from './FormInputField.module.css';


interface Props {
    fieldName: string,
    isRequired?: boolean,
    type: string,
    placeholder:string,
    handleChange: (e: any) => void,
    imageLink?: string,
    value?: any
}

function FormInputField(props : Props)
{
    return (<div className={styles.container}>
    <label>{props.fieldName}{props.isRequired && <span className={styles.redText}>*</span>}
    </label>
    <input defaultValue={props.value} required={props.isRequired} className={styles.inputField} type={props.type} onChange={props.handleChange} placeholder={props.placeholder}/>
    {props.imageLink && <img className={styles.imgIcon} src='/aticon.png'/>}
    </div>)
}

export default FormInputField;