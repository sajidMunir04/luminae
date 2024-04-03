import styles from './HeaderTemplate.module.css';


function HeaderTemplate()
{
    return (<div className={styles.container}>
        <div>

        </div>
        <div>
            <form>
                <input type="search"/>
                <button type="submit"></button>
            </form>
        </div>
        <div>
            <nav className={styles.navArea}>
                <div>
                    <a>About Us</a>
                </div>
                <div>
                    <a>Blog</a>
                </div>
                <div>
                    <a>Contact Us</a>
                </div>
                <div>
                    <a>Help & Support</a>
                </div>
            </nav>
        </div>
        <div>
            <div className={styles.socialLinkSection}>
                <img src={'/Instagram.png'}/>
                <img src={'/FB.png'}/>
                <img src={'/TG.png'}/>
            </div>
        </div>
    </div>);
}

export default HeaderTemplate;