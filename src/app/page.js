import Image from "next/image";
import styles from "./page.module.css";
import HeaderTemplate from "./shared/HeaderTemplate";
import StoreInteractionContainer from "./shared/StoreInteractionContainer";
import ProductsCategoryBrowser from "./shared/ProductsCategoryBrowser";
import MainBanner from "./home/MainBanner";
import FlashSaleLayout from "./home/FlashSaleLayout";
import TrendingProductsLayout from "./home/TrendingProductsLayout";

export default function Home() {
  return (<>
      <HeaderTemplate/>
      <StoreInteractionContainer/>
      <ProductsCategoryBrowser/>
      <MainBanner/>
      <FlashSaleLayout/>
      <TrendingProductsLayout/>
  </>
  );
}
