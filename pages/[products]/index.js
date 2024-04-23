import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import ProductPage from "../../src/app/products/ProductPage";
import ProductsBrowser from "../../src/app/products/ProductsBrowser";
import FooterTemplate from "../../src/app/shared/FooterTemplate";
import HeaderTemplate from "../../src/app/shared/HeaderTemplate";
import StoreInteractionContainer from "../../src/app/shared/StoreInteractionContainer";
import { ProductsContext} from "../../src/app/utils/ProductsContext";
import NoProductFound from "../../src/app/products/NoProductFound";



function Index() {
    const router = useRouter();
    const { searchQuery } = router.query;
    const { products , productSections } = useContext(ProductsContext);

    const filteredProducts = products.filter((item) => item.brandName == searchQuery || 
    item.name == searchQuery || item.category == searchQuery);

    console.log(products.length);

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
      {filteredProducts.length > 0 && <>
      {!isProductSelected && <ProductsBrowser onClick={handleClick} products={filteredProducts} onBack={() => {}}/>}
      {isProductSelected && <ProductPage product={selectedProduct}/>}
      </>
      }
      {filteredProducts.length == 0 && <NoProductFound searchTerm={searchQuery}/>}
      <FooterTemplate/>
    </>);
}


export default Index;