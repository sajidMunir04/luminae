import { ProductsContext } from '../utils/ProductsContext';
import styles from './MainBanner.module.css';
import { useContext } from 'react';

function MainBanner()
{
    const {products} = useContext(ProductsContext);
    console.log(products);
    return (<div className={styles.container}>
        <div className={styles.imageContainer}>
            <img className={styles.image} src='/frmtopleft.png'/>
        </div>
        <div className={styles.textContainer}>
        <div className={styles.textContent}>
                <h2 className={styles.heading}>Kimonos, Caftans & Pareos</h2>
                <p className={styles.headingContent}>Poolside glam included From $4.99</p>
                <div className={styles.button}>
                    <img src="/Icon(1).png"/>
                    <a className={styles.buttonText} href="#">SHOP NOW</a>
                </div>
        </div>
        </div>
    </div>);
}

export default MainBanner;