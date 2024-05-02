import OptionCard from "./OptionCard";
import { Props } from "./Props";
import styles from "./PaymentAndShipping.module.css";
import { useState } from "react";
import { ShippingServiceInfo } from "./ShippingServiceInfo";
import { PaymentServiceInfo } from "./PaymentServiceInfo";

function PaymentAndShipping(props : Props) {

    const [shippingService,setShippingService] = useState<ShippingServiceInfo>();
    const [paymentService,setPaymentService] = useState<PaymentServiceInfo>();

    const shippingServiceOne: ShippingServiceInfo = {
        shippingService: "",
        shippingServiceImageLink: "",
        info: ""
    }

    return (<div className={styles.container}>
        <div className={styles.section}>
            <div>
                <h4>Payment</h4>
                <p>Please choose a payment method</p>
            </div>
            <div>
                <OptionCard heading={"Paypal"} logoLink={"/images/cart/Paypal.svg"} 
                info={"PayPal is a trusted online payment platform that allows individuals and businesses to securely send and receive money electronically."}/>
                <OptionCard heading={"Paypal"} logoLink={"/images/cart/Paypal.svg"} 
                info={"PayPal is a trusted online payment platform that allows individuals and businesses to securely send and receive money electronically."}/>
                <OptionCard heading={"Paypal"} logoLink={"/images/cart/Paypal.svg"} 
                info={"PayPal is a trusted online payment platform that allows individuals and businesses to securely send and receive money electronically."}/>
            </div>
        </div>
        <div className={styles.section}>
            <div>
                <h4>Shipping</h4>
                <p>Please choose a shipping service</p>
            </div>
            <div>
                <OptionCard heading={"Paypal"} logoLink={"/images/cart/Paypal.svg"} 
                info={"PayPal is a trusted online payment platform that allows individuals and businesses to securely send and receive money electronically."}/>
                <OptionCard heading={"Paypal"} logoLink={"/images/cart/Paypal.svg"} 
                info={"PayPal is a trusted online payment platform that allows individuals and businesses to securely send and receive money electronically."}/>
                <OptionCard heading={"Paypal"} logoLink={"/images/cart/Paypal.svg"} 
                info={"PayPal is a trusted online payment platform that allows individuals and businesses to securely send and receive money electronically."}/>
            </div>
        </div>
    </div>);
}

export default PaymentAndShipping;