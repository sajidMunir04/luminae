"use client";

import React, { useEffect, useState } from 'react';
import styles from './HeaderTemplate.module.css';
import router from 'next/router';
import { useStore } from 'zustand';
import { useCartStore } from '../lib/store/useCartStore';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import ProductCategoriesManager from './ProductCategoriesManager';
import { motion } from 'framer-motion';


function HeaderTemplate()
{
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [cartItemsCount,setCartItemCount] = useState<number>(0);

    const subscribe = () => useCartStore.subscribe(state => {setTimeout(() => {setCartItemCount(state.getProductCount())},400)});

    subscribe();   

    useEffect(() => {
        setCartItemCount(useCartStore.getState().getProductCount());
    },[cartItemsCount]);


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };
    
    const onSeachButtonClick = (event : React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.replace('http://localhost:3000/search/' + searchQuery);
    }

    return (<motion.div className={styles.container} initial={{scaleY : 0}} whileInView={{scaleY:1}}>
        <div className={styles.logoContainer}>
            <Link className={styles.logoLink} href='/'><img className={styles.logoImage} src={'/images/common/logo2.png'}/>
            </Link>
        </div>
        <div className={styles.categoriesContainer}>
            <ProductCategoriesManager/>
        </div>
        <form className={styles.form} onSubmit={onSeachButtonClick}>
                <input className={styles.searchInput} type="search" placeholder='Search Products' onChange={handleInputChange}/>
                {/*<select className={styles.categorySelector}>
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
                </select>*/}
                <button className={styles.searchButton} type="submit"><img src={'/images/common/magnifier.svg'}/></button>
        </form>
        <div className={styles.buttons}>
                <Link className={styles.button} href={'/ordersDetail'}>
                    <img className={styles.btnImage} src="/images/common/myOrders.svg"/>
                </Link>
                <Link className={styles.button} href={'/favorites'}>
                    <img className={styles.btnImage} src="/images/common/favorites.svg"/>
                </Link>
                <Link className={styles.button} href='/cart'>
                    <img className={styles.btnImage} src="/images/common/cart.svg"/>
                    {cartItemsCount > 0 && <p className={styles.cartItemsText}>{cartItemsCount}</p>}
                </Link>
                <div className={styles.accountButton}>
                    <SignedOut>
                    <SignInButton />
                    </SignedOut>
                    <SignedIn>
                    <UserButton/>
                    </SignedIn>
                </div>
        </div>
    </motion.div>);
}

export default HeaderTemplate;