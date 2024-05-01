import Image from 'next/image';
import { Product } from '../utils/Product';
import styles from './ProductDisplayCard.module.css';
import { useFavoritesStore } from '../lib/store/useFavoritesStore';
import { useEffect, useState } from 'react';

interface Props{
    product: Product,
    onClick: (product : Product) => void
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
            removeFromFavorites(props.product);
            setFavoriteStatus(false);
        }
    }

    return (<div className={styles.container}>
        <div onClick={() => props.onClick(props.product)} className={styles.imageContainer}>
            <img className={styles.image} src={props.product.images[0]} alt='product image'/>
        </div>
        <div className={styles.textContainer}>
            <div onClick={() => props.onClick(props.product)} className={styles.contentSection}>
                        <p className={styles.brandName}>{props.product.brandName}</p>
                        <p className={styles.productName}>{props.product.name}</p>
                    <div className={styles.productRatingSection}>
                        <div>
                            {<img src="/star(1).png"/>}
                            {<img src="/star(1).png"/>}
                            {<img src="/star(1).png"/>}
                            {<img src="/star(1).png"/>}
                            {<img src="/star(1).png"/>}
                        </div>
                        <div>
                           <p>({props.product.reviews?.length})</p>
                        </div>
                    </div>
                    <div className={styles.priceSection}>
                        <div>
                            <p className={styles.price}>${Math.round(props.product.price)}</p>
                        </div>
                        {props.product.price != 0 && <div>
                            <p className={styles.previousPrice}>${props.product.price}</p>
                        </div>}
                        {props.product.price < props.product.price && 
                        <div>
                            <p className={styles.discountText}>-{Math.ceil(Math.abs((props.product.price 
                                -  props.product.price) / props.product.price) * 100)}%</p>
                        </div>
                        }
                    </div>
            </div>
            <div onClick={handleProductFavorite}  className={styles.favButtonSection}>
                <div>
                    {!favoriteStatus && <img src="images/product/error.svg"/>}
                    {favoriteStatus && <img src="images/product/redHeart.svg"/>}                     
                </div>
            </div>
        </div>
    </div>);
}

export default ProductDisplayCard;