import styles from './MainBanner.module.css';

function MainBanner()
{
    return (<div className={styles.container}>
        <div className={styles.textContainer}>
        <div className={styles.textContent}>
                <p className={styles.itemInfoText}>T-shirt / Tops</p>
                <h1 className={styles.heading}>Summer Value Pack</h1>
                <p className={styles.itemSalePitchText}>cool / colorful / awesome</p>
                <div className={styles.button}>
                    <a className={styles.buttonText} href="WOMAN/dresses">SHOP NOW</a>
                </div>
        </div>
        </div>
        <div className={styles.imageContainer}>
            <img className={styles.image} src='/images/common/file.png'/>
        </div>
    </div>);
}

export default MainBanner;