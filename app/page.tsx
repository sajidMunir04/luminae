

import '../src/components/globals.css';
import '../src/components/fonts.css';
import MainBanner from "../src/components/home/MainBanner";
import TrendingProductsLayout from "../src/components/home/TrendingProductsLayout";
import ProductsDisplayLayout from "../src/components/home/ProductsDisplayLayout";
import FeaturedCategoriesLayout from "../src/components/home/FeaturedCategoriesLayout";
import FooterTemplate from "../src/components/shared/FooterTemplate";
import HeaderTemplate from '@/components/shared/HeaderTemplate';

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
