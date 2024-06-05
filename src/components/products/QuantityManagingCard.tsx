import styles from "./QualityManagingCard.module.css";

interface Props {
    quantity: number,
    setQuantity: (quantity : number) => void
}

function QuantityManagingCard(props : Props) {

    return (<div className={styles.quantityContainer}>
        <button className={styles.quantityButtons} onClick={() => {props.setQuantity(props.quantity - 1)}}>-</button>
        <p className={styles.quantityText}>{props.quantity}</p>
        <button className={styles.quantityButtons} onClick={() => props.setQuantity(props.quantity + 1)}>+</button>
            </div>);
}

export default QuantityManagingCard;