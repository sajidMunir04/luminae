import styles from './FooterTemplate.module.css';


function FooterTemplate()
{
    return (<div className={styles.container}>
        <div className={styles.footerContentSection}>
            <div className={styles.linksSection}>
                <p className={styles.linkText}>Company</p>
                <div className={styles.linksContainer}>
                    <a className={styles.externalLink} href="#">About Us</a>
                    <a className={styles.externalLink} href="#">Our Store</a>
                    <a className={styles.externalLink} href="#">Contact us</a>
                </div>
            </div>
            <div className={styles.linksSection}>
                <p className={styles.linkText}>Career Opportunities</p>
                <div className={styles.linksContainer}>
                    <a className={styles.externalLink} href="#">Selling Programs</a>
                    <a className={styles.externalLink} href="#">Advertise</a>
                    <a className={styles.externalLink} href="#">Cooperation</a>
                </div>
            </div>
            <div className={styles.linksSection}>
                <p className={styles.linkText}>How to Buy</p>
                <div className={styles.linksContainer}>
                    <a className={styles.externalLink} href="#">Making Payments</a>
                    <a className={styles.externalLink} href="#">Delivery Options</a>
                    <a className={styles.externalLink} href="#">Buyer Protection</a>
                    <a className={styles.externalLink} href="#">New User Guide</a>
                </div>
            </div>
            <div className={styles.linksSection}>
                <p className={styles.linkText}>Help</p>
                <div className={styles.linksContainer}>
                    <a className={styles.externalLink} href="#">Contact Us</a>
                    <a className={styles.externalLink} href="#">FAQ</a>
                    <a className={styles.externalLink} href="#">Privacy Policy</a>
                </div>
            </div>
        </div>
        <div className={styles.infoContent}>
            <div className={styles.infoSection}>
                <p>165-179 Forster Road City of Monash, Melbourne, Australia</p>
                <p className={styles.infoText}>©2023 Copyright in reserved for lumine shop</p>
                <div className={styles.socialLinksContainer}>
                    <a className={styles.socialLinkButton} href='#'><img className={styles.socialLinkImage} src='/images/social/instagram.svg'/></a>
                    <a className={styles.socialLinkButton} href='#'><img className={styles.socialLinkImage} src='/images/social/facebook.svg'/></a>
                    <a className={styles.socialLinkButton} href='#'><img className={styles.socialLinkImage} src='/images/social/telegram.svg'/></a>
                </div>
            </div>
        </div>
    </div>);
}

export default FooterTemplate;