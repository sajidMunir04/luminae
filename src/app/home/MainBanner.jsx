import styles from './MainBanner.module.css';


function MainBanner()
{
    return (<div className={styles.container}>
        <div className={styles.imageContainer}>
            <img src='/frmtopleft.png'/>
        </div>
        <div className={styles.textContainer}>
            <h2>Kimonos, Caftans & Pareos</h2>
            <p>Poolside glam included From $4.99</p>
            <div>
                <img src="/Icon(1).png"/>
                <a href="#">SHOP NOW</a>
            </div>
        </div>
    </div>);
}

export default MainBanner;