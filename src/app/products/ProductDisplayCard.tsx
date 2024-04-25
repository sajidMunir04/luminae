import Image from 'next/image';
import { Product } from '../utils/Product';
import styles from './ProductDisplayCard.module.css';
import useFavorites from '../lib/hooks/useFavorites';

interface Props extends Product{
    imageLink: string,
    reviewRating: number,
    currentPrice: number,
    onClick?: (arg0 : any) => void
}

function ProductDisplayCard(props : Props)
{
    const { favorites, toggleFavorite } = useFavorites();

    const handleToggleFavorite = (productId: string) => {
        toggleFavorite(productId);
      };

    return (<div className={styles.container}>
        <div onClick={props.onClick} className={styles.imageContainer}>
            <img className={styles.image} src={props.images[0]} alt='product image'/>
        </div>
        <div className={styles.textContainer}>
            <div onClick={props.onClick} className={styles.contentSection}>
                        <p className={styles.brandName}>{props.brandName}</p>
                        <p className={styles.productName}>{props.name}</p>
                    <div className={styles.productRatingSection}>
                        <div>
                            {props.reviewRating >= 1 && <img src="/star(1).png"/>}
                            {props.reviewRating >= 2 && <img src="/star(1).png"/>}
                            {props.reviewRating >= 3 && <img src="/star(1).png"/>}
                            {props.reviewRating >= 4 && <img src="/star(1).png"/>}
                            {props.reviewRating >= 5 && <img src="/star(1).png"/>}
                        </div>
                        <div>
                           <p>({props.reviews?.length})</p>
                        </div>
                    </div>
                    <div className={styles.priceSection}>
                        <div>
                            <p className={styles.price}>${Math.round(props.currentPrice)}</p>
                        </div>
                        {props.currentPrice != 0 && <div>
                            <p className={styles.previousPrice}>${props.price}</p>
                        </div>}
                        {props.currentPrice < props.price && 
                        <div>
                            <p className={styles.discountText}>-{Math.ceil(Math.abs((props.price -  props.currentPrice) / props.price) * 100)}%</p>
                        </div>
                        }
                    </div>
            </div>
            <div onClick={() => handleToggleFavorite(props._id)}  className={styles.favButtonSection}>
                <div>
                    <img src="/Vector.png"/>                     
                </div>
            </div>
        </div>
    </div>);
}

export default ProductDisplayCard;