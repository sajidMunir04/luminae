import { ST } from 'next/dist/shared/lib/utils';
import styles from './TrendingProductDisplayCard.module.css';

function TrendingProductDisplayCard(props)
{
    return (<div className={styles.container}>
        <div className={styles.imageContainer}>
            <div className={styles.imageSection}>
                <img className={styles.mainImage}  src="/4_org_zoom 1.png"/>
            </div>
            <div className={styles.tagSection}>
                {props.isNewArrival && <div className={styles.tagArea}>
                    <div className={styles.tagSectionImageContainer}>
                    <img className={styles.tagSectionImage} src='/IconNew arivals(1).png'/>
                    </div>   
                    <p className={styles.tagText}>New Arrivals</p>
                </div>}
            </div>
        </div>
        <div className={styles.textContainer}>
            <div className={styles.infoText}>
                <p>{props.brandName}</p>
                <p>{props.productName}</p>
            </div>
            <div className={styles.linkContainer}>
                <a className={styles.externalLink} 
                href={props.productLink}>{props.productPrice} Shop Now</a>
            </div>
        </div>
    </div>);
}

export default TrendingProductDisplayCard;