import { Inter } from "next/font/google";
import '../src/app/globals.css';
import HeaderTemplate from "../src/app/shared/HeaderTemplate";
import ProductCategoriesManager from "../src/app/shared/ProductCategoriesManager";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>Luminae</head>
      <body className={inter.className}>
      <HeaderTemplate/>
      <ProductCategoriesManager/>
      {children}
      </body>
    </html>
  );
}

export async function getStaticPaths() {
  // Generate paths dynamically
  return {
    paths: [
],
    fallback: false
  };
}
