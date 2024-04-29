import styles from './ProductCategoryCard.module.css';

function ProductCategoryCard(props)
{
    return (<div className={styles.container}>
        <div className={styles.contentSection}>
            <p className={styles.headingText}>
                {props.categoryInfo}
            </p>
            <p className={styles.detailText}>
                {props.itemsDetail}
            </p>
            <a className={styles.link} href={props.link}>Explore All Category</a>
        </div>
        <div>
            <img src='/Rectangle 1078.png'/>
        </div>
    </div>);
}

export default ProductCategoryCard;