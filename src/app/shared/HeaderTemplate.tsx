import styles from './HeaderTemplate.module.css';


function HeaderTemplate()
{
    function onLogoClick()
    {
        
    }

    return (<div className={styles.container}>
        <div className={styles.logoContainer}>
            <a href='/'><img src={'/Group1.png'}/>
            </a>
        </div>
        <form className={styles.form}>
                <input className={styles.searchInput} type="search" placeholder='Search Products'/>
                <select className={styles.categorySelector}>
                    <option className={styles.categoriesTextOption}>
                        All Categories
                    </option>
                    <option className={styles.categoriesTextOption}>
                        Men
                    </option>
                    <option className={styles.categoriesTextOption}>
                        Woman
                    </option>
                    <option className={styles.categoriesTextOption}>
                        Kids
                    </option>
                    <option className={styles.categoriesTextOption}>
                        Home Decor
                    </option>
                </select>
                <button className={styles.searchButton} type="submit"><img src={'/search.png'}/></button>
            </form>
            <nav className={styles.navArea}>
                <div>
                    <a href='/cart'>About Us</a>
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