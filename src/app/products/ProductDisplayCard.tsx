import Image from 'next/image';
import { Product } from '../utils/Product';
import styles from './ProductDisplayCard.module.css';
import { useFavoritesStore } from '../lib/store/useFavoritesStore';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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
        if (!isAddedToFavorites(props.product._id))
        {
            addToFavorites(props.product);
            setFavoriteStatus(true);
        }
        else{
            removeFromFavorites(props.product);
            setFavoriteStatus(false);
            setTimeout(() => {
                props.onRemoveFromFavorites?.(props.product);
            },150);
        }
    }

    const productRating = props.product.reviews?.map((item) => item.rating).reduce((acc,el) => acc + el,0) as number;

    return (<motion.div className={styles.container} initial={{scale: 0}} whileInView={{scale: 1}}>
        <div onClick={() => props.onClick(props.product)} className={styles.imageContainer}>
            <img className={styles.image} src={props.product.images[0]} alt='product image'/>
        </div>
        <div className={styles.textContainer}>
            <div onClick={() => props.onClick(props.product)} className={styles.contentSection}>
                    <div className={styles.productTextContainer}>
                        {/*<p className={styles.brandName}>{props.product.brandName}</p>*/}
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
                        <p className={styles.price}>${Math.round(props.product.price)}</p>
                        {props.product.discount > 0 && <p className={styles.previousPrice}>${props.product.previousPrice}</p>}
                        {(props.product.discount > 0) && <p className={styles.discountText}>-{props.product.discount.toFixed(0)}%</p>}
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
    </motion.div>);
}

export default ProductDisplayCard;