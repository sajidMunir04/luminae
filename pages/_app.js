import ProductsManager from "../src/app/utils/ProductsContext";


function MyApp({ Component, pageProps }) {
  return (
    <ProductsManager>
      <Component {...pageProps} />
      </ProductsManager>
  );
}

export default MyApp;