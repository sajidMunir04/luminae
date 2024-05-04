import OptionCard from "./OptionCard";
import { Props } from "./Props";
import styles from "./PaymentAndShipping.module.css";
import { useState } from "react";
import { ShippingServiceInfo } from "./ShippingServiceInfo";
import { PaymentServiceInfo } from "./PaymentServiceInfo";
import { OrderData } from "./OrderData";

function PaymentAndShipping(props : Props) {

    const shippingServiceOne: ShippingServiceInfo = {
        shippingService: "AUSFF",
        shippingServiceImageLink: "/images/cart/ausff.svg",
        deliveryTime: "14-21",
        shippingCost: 0,
        hasInsurancePolicy: false
    }

    const shippingServiceTwo: ShippingServiceInfo = {
        shippingService: "Race Couriers",
        shippingServiceImageLink: "/images/cart/raceCouriers.svg",
        deliveryTime: "14-21",
        shippingCost: 10,
        hasInsurancePolicy: true
    }

    const shippingServiceThree: ShippingServiceInfo = {
        shippingService: "",
        shippingServiceImageLink: "/images/cart/transCargo.svg",
        deliveryTime: "",
        shippingCost: 12,
        hasInsurancePolicy: true
    }

    const paymentServiceOne: PaymentServiceInfo = {
        paymentService: "Paypal",
        paymentServiceImageLink: "/images/cart/Paypal.svg",
        info: "PayPal is a trusted online payment platform that allows individuals and businesses to securely send and receive money electronically."
    }

    const paymentServiceTwo: PaymentServiceInfo = {
        paymentService: "Mastercard",
        paymentServiceImageLink: "/images/cart/masterCard.svg",
        info: "PayPal is a trusted online payment platform that allows individuals and businesses to securely send and receive money electronically."
    }

    const paymentServiceThree: PaymentServiceInfo = {
        paymentService: "Bitcoin",
        paymentServiceImageLink: "/images/cart/Paypal.svg",
        info: "PayPal is a trusted online payment platform that allows individuals and businesses to securely send and receive money electronically."
    }

    const handleShippingServiceSelection = (shippingService: ShippingServiceInfo) => {
        const newOrderData : OrderData = props.orderData;
        newOrderData.shippingServiceInfo = shippingService;
        props.setOrderData(newOrderData);
    }

    const handlePaymentServiceSelection = (paymentService: PaymentServiceInfo) => {
        const newOrderData : OrderData = props.orderData;
        newOrderData.paymentServiceInfo = paymentService;
        props.setOrderData(newOrderData);
    }

    handlePaymentServiceSelection(paymentServiceOne);
    handleShippingServiceSelection(shippingServiceOne);

    return (<div className={styles.container}>
        <div className={styles.section}>
            <div>
                <h4>Payment</h4>
                <p>Please choose a payment method</p>
            </div>
            <div>
                <OptionCard selected={props.orderData.paymentServiceInfo === paymentServiceOne} heading={paymentServiceOne.paymentService} logoLink={paymentServiceOne.paymentServiceImageLink} onClick={() => handlePaymentServiceSelection(paymentServiceOne)}
                info={"PayPal is a trusted online payment platform that allows individuals and businesses to securely send and receive money electronically."}/>
                <OptionCard selected={props.orderData.paymentServiceInfo === paymentServiceTwo} heading={paymentServiceTwo.paymentService} logoLink={paymentServiceTwo.paymentServiceImageLink} onClick={() => handlePaymentServiceSelection(paymentServiceTwo)}
                info={"PayPal is a trusted online payment platform that allows individuals and businesses to securely send and receive money electronically."}/>
                <OptionCard selected={props.orderData.paymentServiceInfo === paymentServiceThree} heading={paymentServiceThree.paymentService} logoLink={paymentServiceThree.paymentServiceImageLink} onClick={() => handlePaymentServiceSelection(paymentServiceThree)}
                info={"PayPal is a trusted online payment platform that allows individuals and businesses to securely send and receive money electronically."}/>
            </div>
        </div>
        <div className={styles.section}>
            <div>
                <h4>Shipping</h4>
                <p>Please choose a shipping service</p>
            </div>
            <div>
                <OptionCard selected={props.orderData.shippingServiceInfo === shippingServiceOne} heading={shippingServiceOne.shippingService} logoLink={shippingServiceOne.shippingServiceImageLink} onClick={() => handleShippingServiceSelection(shippingServiceOne)}
                info={"PayPal is a trusted online payment platform that allows individuals and businesses to securely send and receive money electronically."}/>
                <OptionCard selected={props.orderData.shippingServiceInfo === shippingServiceTwo} heading={shippingServiceTwo.shippingService} logoLink={shippingServiceTwo.shippingServiceImageLink} onClick={() => handleShippingServiceSelection(shippingServiceTwo)}
                info={"PayPal is a trusted online payment platform that allows individuals and businesses to securely send and receive money electronically."}/>
                <OptionCard selected={props.orderData.shippingServiceInfo === shippingServiceThree} heading={shippingServiceThree.shippingService} logoLink={shippingServiceThree.shippingServiceImageLink} onClick={() => handleShippingServiceSelection(shippingServiceThree)}
                info={"PayPal is a trusted online payment platform that allows individuals and businesses to securely send and receive money electronically."}/>
            </div>
        </div>
    </div>);
}

export default PaymentAndShipping;