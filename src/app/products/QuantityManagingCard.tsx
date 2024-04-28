import styles from "./QualityManagingCard.module.css";

interface Props {
    quantity: number,
    setQuantity: (quantity : number) => void
}

function QuantityManagingCard(props : Props) {
    return (<div className={styles.quantityContainer}>
        <p className={styles.quantityButtons}>-</p>
        <p className={styles.quantityText}>{props.quantity}</p>
        <p className={styles.quantityButtons}>+</p>
            </div>);
}

export default QuantityManagingCard;