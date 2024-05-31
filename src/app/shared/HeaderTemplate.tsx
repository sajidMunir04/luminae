"use client";

import React, { useEffect, useState } from 'react';
import styles from './HeaderTemplate.module.css';
import { useRouter } from 'next/router';
import { useStore } from 'zustand';
import { useCartStore } from '../lib/store/useCartStore';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import ProductCategoriesManager from './ProductCategoriesManager';
import { motion } from 'framer-motion';
import SearchResults, { SearchResult } from './SearchResults';


function HeaderTemplate()
{
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [cartItemsCount,setCartItemCount] = useState<number>(0);
    const [searchResults,setSearchResults] = useState<SearchResult[]>([]);

    //const router = useRouter();

    const subscribe = () => useCartStore.subscribe(state => {setTimeout(() => {setCartItemCount(state.getProductCount())},400)});

    subscribe();   

    useEffect(() => {
        setCartItemCount(useCartStore.getState().getProductCount());
    },[cartItemsCount]);


    const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);

        const fetchSearchResult = async() => {
            const response = await fetch('/api/searchProducts',{
                method: "POST",
                body: event.target.value
            });
            const data = await response.json();
            console.log(data);
            if (data.data) {
                const searchResults  : SearchResult[] = data.data.map((item) => {
                    const searchResult : SearchResult = {
                        productName: item.name,
                        productPrie: item.price,
                        images: item.images
                    }

                    return searchResult;
                })

                setSearchResults(searchResults);
            }
        }

        if (event.target.value.length > 3 && event.target.value.length <= 6)
            fetchSearchResult()
    };
    
    const onSeachButtonClick = (event : React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        //router.push('http://localhost:3000/search/' + searchQuery);
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
                <input className={styles.searchInput} type="search" placeholder='Search Products' onChange={handleSearchInput}/>
                <button className={styles.searchButton} type="submit"><img src={'/images/common/magnifier.svg'}/></button>
             {true && <SearchResults searchResults={searchResults}/>}
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