import { ChangeEvent, useState } from "react";
import FormInputField from "../account/FormInputField"
import styles from "./CustomerInformation.module.css";
import { OrderData } from "./OrderData";
import { Props } from "./Props";

function CustomerInformation(props : Props) {

    const regex : RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    const [email,setEmail] = useState<string>(props.orderData.email);
    const [firstName,setFirstName] = useState<string>(props.orderData.firstName);
    const [lastName,setLastName] = useState<string>(props.orderData.lastName);
    const [country,setCountry] = useState<string>(props.orderData.country);
    const [region,setRegion] = useState<string>(props.orderData.region);
    const [address,setAddress] = useState<string>(props.orderData.address);
    const [phoneNumber,setPhoneNumber] = useState<string>(props.orderData.phoneNumber);

    const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (regex.test(e.target.value)) {
            const newOrderData : OrderData = props.orderData;
            newOrderData.email = e.target.value;
            props.setOrderData(newOrderData);
        }
    }

    const handleFirstName = (e : ChangeEvent<HTMLInputElement>) => {
        const newOrderData : OrderData = props.orderData;
        newOrderData.firstName = e.target.value;
        props.setOrderData(newOrderData);
    }

    const handlelastName = (e : ChangeEvent<HTMLInputElement>) => {
        const newOrderData : OrderData = props.orderData;
        newOrderData.lastName = e.target.value;
        props.setOrderData(newOrderData);
    }

    const handleRegion = (e : ChangeEvent<HTMLInputElement>) => {
        const newOrderData : OrderData = props.orderData;
        newOrderData.region = e.target.value;
        props.setOrderData(newOrderData);
    }

    const handleAddress = (e : ChangeEvent<HTMLInputElement>) => {
        const newOrderData : OrderData = props.orderData;
        newOrderData.address = e.target.value;
        props.setOrderData(newOrderData);
    }

    const handlePhoneNumber = (e : ChangeEvent<HTMLInputElement>) => {
        const newOrderData : OrderData = props.orderData;
        newOrderData.phoneNumber = e.target.value.toString();
        props.setOrderData(newOrderData);
    }

    const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value !== 'Select Country') {
            const newOrderData : OrderData = props.orderData;
            newOrderData.country = e.target.value;
            props.setOrderData(newOrderData);
        }
    }

    return (<div className={styles.container}>
        <h4>Customer Information</h4>
        <div>
            <FormInputField fieldName={"E-mail"} value={email} type={"email"} placeholder={""} isRequired={true} handleChange={handleEmailInput} />
        </div>
        <div className={styles.nameFieldsContainer}>
            <div className={styles.nameField}><FormInputField value={firstName} fieldName={"First Name"} type={"text"} placeholder={""} isRequired={true} handleChange={handleFirstName}/></div>
            <div className={styles.nameField}><FormInputField value={lastName} fieldName={"Last Name"} type={"text"} placeholder={""} isRequired={true} handleChange={handlelastName}/></div>
        </div>
        <h3>Shipping Address</h3>
        <div>
            <div><select onChange={handleCountryChange} className={styles.selectCountry}>
                <option className={styles.selectOption}>Select Country</option>
                <option value={'Australia'} className={styles.selectOption}>Australia</option>
                <option value={'United States'} className={styles.selectOption}>United States</option>
                <option value={'United Kingdom'} className={styles.selectOption}>United Kingdom</option>
                </select></div>
            <div><FormInputField value={region} fieldName={"State/Region"} type={"text"} placeholder={""} isRequired={true} handleChange={handleRegion}/></div>
            <div><FormInputField value={address} fieldName={"Address"} type={"text"} placeholder={""} isRequired={true} handleChange={handleAddress}/></div>
            <div><FormInputField value={phoneNumber} fieldName={"Phone Number"} type={"number"} placeholder={""} isRequired={true} handleChange={handlePhoneNumber}/></div>
        </div>
    </div>);
}

export default CustomerInformation;