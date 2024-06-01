import { OrderFormData, ProductOrderDetail } from "../cart/OrderFormData";
import styles from "./CustomerOrder.module.css";

interface Props{
    orderform : OrderFormData
}


function CustomerOrder(props : Props) {
    return (<div className={styles.container}>
        <p className={styles.sectionHeading}>Ordered Products</p>
        <div className={styles.productSection}>
        {props.orderform?.products?.map((product) => (<div className={styles.productContainer} key={product._id}>
            <div className={styles.productInfoContainer}>
            <div className={styles.productImageContainer}>
                <img className={styles.productImage} src={product.imageLink}/>
            </div>
            <div className={styles.productSpecificInfo}>
                <p className={styles.productNameText}>{product.name}</p>
            </div>
        </div>
        <div>
            <p>Price: ${product.unitPrice}</p>
            <p>Size: {product.size}</p>
            <p>Quantity: {product.quantity}</p>
        </div>
        <div>
            <p>Total: ${product.unitPrice * product.quantity}</p>
        </div>
        </div>))}
        </div>
        <p className={styles.sectionHeading}>Customer Details</p>
        <div className={styles.customerInfoSection}>
            <div>
                <p>Customer Name : {props.orderform?.customerName}</p>
                <p>Customer Email: {props.orderform?.customerEmail}</p>
                <p>Customer Phone: {props.orderform?.customerPhone}</p>
            </div>
            <div>
                <p>Customer Address: {props.orderform?.customerAddress}</p>
                <p>Customer Country: {props.orderform?.customerCountry}</p>
            </div>
        </div>
        <p className={styles.sectionHeading}>Order Total</p>
        <div className={styles.orderPriceSection}>
            <div>
            <p>Order Total:</p>
            <p>Shipping Charges:</p>
            <p>Taxes:</p>
            </div>
            <div>
            <p>$  {props.orderform?.orderPriceTotal}</p>
            <p>$  {props.orderform?.orderShippingCharges}</p>
            <p>$  {props.orderform?.orderTaxes}</p>
            </div>
        </div>
    </div>);
}

export default CustomerOrder;