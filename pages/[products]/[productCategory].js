import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../src/app/utils/ProductsContext";
import ContextData from "../ContextData";
import FooterTemplate from "../../src/app/shared/FooterTemplate";
import HeaderTemplate from "../../src/app/shared/HeaderTemplate";
import ProductsCategoryBrowser from "../../src/app/shared/ProductsCategoryBrowser";
import StoreInteractionContainer from "../../src/app/shared/StoreInteractionContainer";
import ProductsBrowser from "../../src/app/products/ProductsBrowser";
import ProductPage from "../../src/app/products/ProductPage";
import '../../src/app/fonts.css';

function productCategory(){
    const router = useRouter();
    const { section , productCategory } = router.query;
    const { products , productSections } = useContext(ProductsContext);

    const filteredProducts = products.filter((item) => item.category == 
    productCategory);

    useEffect (() => {
      if (typeof window !== 'undefined') {
        window.history.pushState({ page: 'products' }, section, productCategory);
        window.addEventListener('popstate', function(event) {
          handleBack();
        });
      }
    },[]);
    const [selectedProduct,setSelectedProduct] = useState(filteredProducts[0]);
    const [isProductSelected,setProductSelectStatus] = useState(false);

    const handleClick = (product = filteredProducts[0]) => {
      setSelectedProduct(product);
      setProductSelectStatus(true);
    }

    const handleBack = () => {
      setSelectedProduct(null);
      setProductSelectStatus(false);
    }

    return (<>
      <HeaderTemplate/>
      <StoreInteractionContainer/>
      {!isProductSelected && <ProductsBrowser onClick={handleClick} products={filteredProducts}/>}
      {isProductSelected && <ProductPage product={selectedProduct}/>}
      <FooterTemplate/>
    </>);
}

export default ContextData(productCategory);