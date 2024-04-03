import styles from './HeaderTemplate.module.css';


function HeaderTemplate()
{
    return (<div className={styles.container}>
        <div className={styles.logoContainer}>
            <img src={'/Group1.png'}/>
        </div>
        <form className={styles.form}>
                <input className={styles.searchInput} type="search" placeholder='Search Products'/>
                <select className={styles.categorySelector}>
                    <option>
                        All Categories
                    </option>
                    <option>
                        Men
                    </option>
                    <option>
                        Woman
                    </option>
                    <option>
                        Kids
                    </option>
                    <option>
                        Home Decor
                    </option>
                </select>
                <button className={styles.searchButton} type="submit"><img src={'/search.png'}/></button>
            </form>
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