import { useContext, useRef, useState } from 'react';
import styles from './HeaderTemplate.module.css';
import ProductsBrowser from '../products/ProductsBrowser';
import router from 'next/router';
import { useStore } from 'zustand';
import { useCartStore } from '../lib/store/useCartStore';



function HeaderTemplate()
{
    const [inputValue, setInputValue] = useState<string>('');
    const [cartItemsCount,setCartItemCount] = useState(useStore(useCartStore,state => state.cartData.totalItems));
    const subscribe = () => useCartStore.subscribe(state => {setCartItemCount(state.cartData.totalPrice)}
    ); 


    subscribe();    

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
            <div className={styles.buttons}>
                <a className={styles.button} href={'auth/signIn'}>
                <img className={styles.btnImage} src="/IconSign in.png"/>
                <p>Sign in</p>
                </a>
                <a className={styles.button} href={'/favorites'}>
                    <img className={styles.btnImage} src="/Favorides.png"/>
                    <p>Favorites</p>
                </a>
                <a className={styles.button} href='/cart'>
                    <img className={styles.btnImage} src="/card.png"/>
                    <p>Cart</p>
                    <p>{cartItemsCount}</p>
                </a>
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