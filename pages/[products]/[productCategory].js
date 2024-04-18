import { useRouter } from "next/router";
import React, { useContext } from "react";
import { ProductsContext } from "../../src/app/utils/ProductsContext";
import ContextData from "../ContextData";
import AdvertisementLayout from "../../src/app/home/AdvertisementLayout";
import CategoryCardsLayout from "../../src/app/home/CategoryCardsLayout";
import FeaturedCategoriesLayout from "../../src/app/home/FeaturedCategoriesLayout";
import FlashSaleLayout from "../../src/app/home/FlashSaleLayout";
import MainBanner from "../../src/app/home/MainBanner";
import ProductsDisplayLayout from "../../src/app/home/ProductsDisplayLayout";
import TrendingProductsLayout from "../../src/app/home/TrendingProductsLayout";
import EmailSubscribeSection from "../../src/app/shared/EmailSubscribeSection";
import FooterTemplate from "../../src/app/shared/FooterTemplate";
import HeaderTemplate from "../../src/app/shared/HeaderTemplate";
import ProductsCategoryBrowser from "../../src/app/shared/ProductsCategoryBrowser";
import StoreInteractionContainer from "../../src/app/shared/StoreInteractionContainer";
import ProductsBrowser from "../../src/app/products/ProductsBrowser";

function productCategory(){
    const router = useRouter();
    const { section , productCategory } = router.query;
    const { products , productSections } = useContext(ProductsContext);

    const filteredProducts = products.filter((item) => item.category == 
    productCategory);

    console.log("filtered Products",filteredProducts);
    return (<>
      <HeaderTemplate/>
      <StoreInteractionContainer/>
      <ProductsBrowser products={filteredProducts}/>

      <FooterTemplate/>
    </>);
}

export default ContextData(productCategory);