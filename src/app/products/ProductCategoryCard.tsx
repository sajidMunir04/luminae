import styles from './ProductCategoryCard.module.css';

interface Props {
    categoryInfo: string,
    itemsDetail: string,
    link: string,
    imageLink: string
}


function ProductCategoryCard(props : Props)
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
        <div className={styles.imageContainer}>
            <img className={styles.image} src={props.imageLink}/>
        </div>
    </div>);
}

export default ProductCategoryCard;