"use client";

import React, { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import styles from './HeaderTemplate.module.css';
import ProductsBrowser from '../products/ProductsBrowser';
import router from 'next/router';
import { useStore } from 'zustand';
import { useCartStore } from '../lib/store/useCartStore';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { auth, currentUser, getAuth } from "@clerk/nextjs/server";
import { request } from 'https';
import { RequestLike } from '@clerk/nextjs/dist/types/server/types';
import Link from 'next/link';



function HeaderTemplate()
{
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [cartItemsCount,setCartItemCount] = useState<number>(0);

    const subscribe = () => useCartStore.subscribe(state => {setTimeout(() => {setCartItemCount(state.getProductCount())},400)});

    subscribe();   

    useEffect(() => {
        setCartItemCount(useCartStore.getState().getProductCount());
        console.log(useCartStore.getState().getProductCount());
    },[cartItemsCount]);


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };
    
    const onSeachButtonClick = (event : React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.replace('http://localhost:3000/search/' + searchQuery);
    }

    return (<div className={styles.container}>
        <div className={styles.logoContainer}>
            <Link href='/'><img src={'/Group1.png'}/>
            </Link>
        </div>
        <form className={styles.form} onSubmit={onSeachButtonClick}>
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
                <button className={styles.searchButton} type="submit"><img src={'/images/magnifier.svg'}/></button>
        </form>
        <div className={styles.buttons}>
                {/*
                <a className={styles.button} href={'http://localhost:3000/auth/signIn'}>
                <img className={styles.btnImage} src="/IconSign in.png"/>
                <p>Sign in</p>
                </a>*/}
                <Link className={styles.button} href={'/favorites'}>
                    <img className={styles.btnImage} src="/Favorides.png"/>
                    <p>Favorites</p>
                </Link>
                <Link className={styles.button} href='/cart'>
                    <img className={styles.btnImage} src="/card.png"/>
                    <p>Cart</p>
                    {cartItemsCount > 0 && <p className={styles.cartItemsText}>{cartItemsCount}</p>}
                </Link>
        </div>
        <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton/>
        </SignedIn>
        </div>
    </div>);
}

export default HeaderTemplate;