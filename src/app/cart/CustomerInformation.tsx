import { useState } from "react";
import FormInputField from "../account/FormInputField"
import styles from "./CustomerInformation.module.css";
import { OrderData } from "./OrderData";
import { Props } from "./Props";

function CustomerInformation(props : Props) {

    const [email,setEmail] = useState<string>();   
    const [firstName,setFirstName] = useState<string>();
    const [lastName,setLastName] = useState<string>();
    const [country,setCountry] = useState<string>();
    const [region,setRegion] = useState<string>();
    const [address,setAddress] = useState<string>();
    const [phoneNumber,setPhoneNumber] = useState<number>();

    return (<div className={styles.container}>
        <h4>Customer Information</h4>
        <div>
            <FormInputField fieldName={"E-mail"} type={"email"} placeholder={""} isRequired={true} />
        </div>
        <div className={styles.nameFieldsContainer}>
            <div className={styles.nameField}><FormInputField fieldName={"First Name"} type={"text"} placeholder={""} isRequired={true}/></div>
            <div className={styles.nameField}><FormInputField fieldName={"Last Name"} type={"text"} placeholder={""} isRequired={true}/></div>
        </div>
        <h3>Shipping Address</h3>
        <div>
            <div></div>
            <div><FormInputField fieldName={"State/Region"} type={"text"} placeholder={""} isRequired={true}/></div>
            <div><FormInputField fieldName={"Address"} type={"text"} placeholder={""} isRequired={true}/></div>
            <div><FormInputField fieldName={"Phone Number"} type={"number"} placeholder={""} isRequired={true}/></div>
        </div>
    </div>);
}

export default CustomerInformation;