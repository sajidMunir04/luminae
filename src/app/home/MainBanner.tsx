import styles from './MainBanner.module.css';

function MainBanner()
{
    return (<div className={styles.container}>
        <div className={styles.imageContainer}>
            <img className={styles.image} src='/frmtopleft.png'/>
        </div>
        <div className={styles.textContainer}>
        <div className={styles.textContent}>
                <h2 className={styles.heading}>Premium Collections</h2>
                <p className={styles.headingContent}>Designer wear starting from $100</p>
                <div className={styles.button}>
                    <a className={styles.buttonText} href="WOMAN/dresses">SHOP NOW</a>
                </div>
        </div>
        </div>
    </div>);
}

export default MainBanner;