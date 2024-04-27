import { useContext, useRef, useState } from 'react';
import styles from './HeaderTemplate.module.css';
import { ProductsContext } from '../utils/ProductsContext';
import ProductsBrowser from '../products/ProductsBrowser';
import router from 'next/router';



function HeaderTemplate()
{
    const {products, productSections } = useContext(ProductsContext);
    const [inputValue, setInputValue] = useState<string>('');

    const onSearchButtonClick = () => {
        router.push(inputValue);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    return (<div className={styles.container}>
        <div className={styles.logoContainer}>
            <a href='/'><img src={'/Group1.png'}/>
            </a>
        </div>
        <form className={styles.form}>
                <input className={styles.searchInput} type="search" placeholder='Search Products' onChange={handleInputChange}/>
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
                <button onClick={onSearchButtonClick}  className={styles.searchButton} type="submit"><img src={'/images/magnifier.svg'}/></button>
            </form>
            <nav className={styles.navArea}>
                    <a className={styles.link} href='/admin'>Admin</a>
                    <a className={styles.link} href='#'>Blog</a>
                    <a className={styles.link} >Contact Us</a>
                    <a className={styles.link} >Help & Support</a>
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