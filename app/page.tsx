

import '../src/app/globals.css';
import '../src/app/fonts.css';
import MainBanner from "../src/app/home/MainBanner";
import TrendingProductsLayout from "../src/app/home/TrendingProductsLayout";
import ProductsDisplayLayout from "../src/app/home/ProductsDisplayLayout";
import FeaturedCategoriesLayout from "../src/app/home/FeaturedCategoriesLayout";
import FooterTemplate from "../src/app/shared/FooterTemplate";
import HeaderTemplate from '@/app/shared/HeaderTemplate';

function Home() {
  return (<>
      <HeaderTemplate/>
      <MainBanner/>
      <FeaturedCategoriesLayout/>
      <TrendingProductsLayout/>
      <ProductsDisplayLayout/>
      <FooterTemplate/>
  </>
  );
}

export default Home;
