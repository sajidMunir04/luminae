'use client';
import SaleProductDisplayCard from "../shared/SaleProductDisplayCard";
import ProductDisplayLayoutHeader from "./ProductDisplayLayoutHeader";
import styles from './FlashSaleLayout.module.css';
import { DealTime } from "../shared/staticdata";

function FlashSaleLayout()
{
    return (<div className={styles.container}>
        <div>
            <ProductDisplayLayoutHeader heading="Flash Sales" link="#" linkText="View All"/>
        </div>
        <div className={styles.content}>
            <SaleProductDisplayCard saleTimeSpan={DealTime.Day} productBrand={"Tonny Black"} 
            productName="Shoulder bag-White-Plain" saleTimeRemaining={timeInSeconds} productRating={5} 
            reviewsCount={54} reducedPrice={69.99} originalPrice={129.99}/>
                        <SaleProductDisplayCard saleTimeSpan={DealTime.Day} productBrand={"Tonny Black"} 
            productName="Shoulder bag-White-Plain" saleTimeRemaining={timeInSeconds} productRating={5} 
            reviewsCount={54} reducedPrice={69.99} originalPrice={129.99}/>
                        <SaleProductDisplayCard saleTimeSpan={DealTime.Day} productBrand={"Tonny Black"} 
            productName="Shoulder bag-White-Plain" saleTimeRemaining={timeInSeconds} productRating={5} 
            reviewsCount={54} reducedPrice={69.99} originalPrice={129.99}/>
        </div>
    </div>);
}

export default FlashSaleLayout;

// Normally this would come from database
const timeInSeconds = 86400;    
