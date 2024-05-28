

import '../src/app/globals.css';
import '../src/app/fonts.css';
import MainBanner from "../src/app/home/MainBanner";
import FlashSaleLayout from "../src/app/home/FlashSaleLayout";
import TrendingProductsLayout from "../src/app/home/TrendingProductsLayout";
import ProductsDisplayLayout from "../src/app/home/ProductsDisplayLayout";
import CategoryCardsLayout from "../src/app/home/CategoryCardsLayout";
import AdvertisementLayout from "../src/app/home/AdvertisementLayout";
import FeaturedCategoriesLayout from "../src/app/home/FeaturedCategoriesLayout";
import FooterTemplate from "../src/app/shared/FooterTemplate";

function Home() {
  return (<>
      <MainBanner/>
      <FeaturedCategoriesLayout/>
      <TrendingProductsLayout/>
      <ProductsDisplayLayout/>
  </>
  );
}

export default Home;
