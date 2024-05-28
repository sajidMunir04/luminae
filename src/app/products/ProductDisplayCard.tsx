import Image from 'next/image';
import { Product } from '../utils/Product';
import styles from './ProductDisplayCard.module.css';
import { useFavoritesStore } from '../lib/store/useFavoritesStore';
import { useEffect, useState } from 'react';

interface Props{
    product: Product,
    onClick: (product : Product) => void,
    onRemoveFromFavorites?: (product: Product) => void
}

function ProductDisplayCard(props : Props)
{
    const addToFavorites = useFavoritesStore(state => state.addToFavorites);
    const removeFromFavorites = useFavoritesStore(state => state.removeFromFavorites);
    const isAddedToFavorites = useFavoritesStore(state => state.isAddedToFavorites);

    const[favoriteStatus,setFavoriteStatus] = useState(false);

    useEffect (() => {
        if (isAddedToFavorites(props.product._id)){
            setFavoriteStatus(true);
        }
    },[])


    const handleProductFavorite = () => {
        if (favoriteStatus === false)
        {
            addToFavorites(props.product);
            setFavoriteStatus(true);
        }
        else{
            setFavoriteStatus(false);
            props.onRemoveFromFavorites?.(props.product);
            removeFromFavorites(props.product);
        }
    }

    const productRating = props.product.reviews?.map((item) => item.rating).reduce((acc,el) => acc + el,0) as number;

    return (<div className={styles.container}>
        <div onClick={() => props.onClick(props.product)} className={styles.imageContainer}>
            <img className={styles.image} src={props.product.images[0]} alt='product image'/>
        </div>
        <div className={styles.textContainer}>
            <div onClick={() => props.onClick(props.product)} className={styles.contentSection}>
                    <div className={styles.productTextContainer}>
                        <p className={styles.brandName}>{props.product.brandName}</p>
                        <p className={styles.productName}>{props.product.name}</p>
                    </div>
                    <div className={styles.productDetailContainer}>
                    <div className={styles.productRatingSection}>
                        <div className={styles.starsContainer}>
                            {productRating >= 1 && <img src="/images/product/Star.svg"/>}
                            {productRating >= 2 && <img src="/images/product/Star.svg"/>}
                            {productRating >= 3 && <img src="/images/product/Star.svg"/>}
                            {productRating >= 4 && <img src="/images/product/Star.svg"/>}
                            {productRating === 5 && <img src="/images/product/Star.svg"/>}
                        </div>
                        <div className={styles.reviewCountContainer}>
                            <p className={styles.reviewCountText}>({props.product.reviews?.length})</p>
                        </div>
                    </div>
                    <div className={styles.priceSection}>
                        <div>
                            <p className={styles.price}>${Math.round(props.product.price)}</p>
                        </div>
                        {props.product.discount > 0 && <div>
                            <p className={styles.previousPrice}>${props.product.previousPrice}</p>
                        </div>}
                        {(props.product.discount > 0) && 
                        <div>
                            <p className={styles.discountText}>-{props.product.discount.toFixed(0)}%</p>
                        </div>
                        }
                    </div>
                    </div>
            </div>
            <div onClick={handleProductFavorite}  className={styles.favButtonSection}>
                <div>
                    {!favoriteStatus && <img src="/images/product/emptyHeart.svg"/>}
                    {favoriteStatus && <img src="/images/product/redHeart.svg"/>}                     
                </div>
            </div>
        </div>
    </div>);
}

export default ProductDisplayCard;