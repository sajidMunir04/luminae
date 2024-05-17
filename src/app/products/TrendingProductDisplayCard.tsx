import styles from './TrendingProductDisplayCard.module.css';
import { Product } from '../utils/Product';

interface Props {
    product: Product
}


function TrendingProductDisplayCard(props : Props)
{
    return (<div className={styles.container}>
        <div className={styles.imageContainer}>
            <div className={styles.imageSection}>
                <img className={styles.mainImage}  src={props.product.images[0]}/>
            </div>
            <div className={styles.tagSection}>
                <div className={styles.tagArea}>
                    <div className={styles.tagSectionImageContainer}>
                    <img className={styles.tagSectionImage} src='/IconNew arivals(1).png'/>
                    </div>   
                    <p className={styles.tagText}>New Arrivals</p>
                </div>
            </div>
        </div>
        <div className={styles.textContainer}>
            <div className={styles.infoText}>
                <p className={styles.brandName}>{props.product.brandName}</p>
                <p>{props.product.name}</p>
            </div>
            <div className={styles.linkContainer}>
                <a className={styles.externalLink} 
                href={"item/" + props.product._id}>Shop Now</a>
            </div>
        </div>
    </div>);
}

export default TrendingProductDisplayCard;