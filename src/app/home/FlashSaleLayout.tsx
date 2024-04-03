import SaleProductDisplayCard from "../shared/SaleProductDisplayCard";
import ProductDisplayLayoutHeader from "./ProductDisplayLayoutHeader";
import styles from './FlashSaleLayout.module.css';

function FlashSaleLayout()
{
    return (<div className={styles.container}>
        <div>
            <ProductDisplayLayoutHeader heading="Flash Sales" link="#" linkText="View All"/>
        </div>
        <div className={styles.content}>
            <SaleProductDisplayCard saleTimeSpan={dealTime["Day"]} saleTimeRemaining={timeInHrs}/>
        </div>
    </div>);
}

export default FlashSaleLayout;

// Normally this would come from other place
const timeInHrs = 24;

const dealTime = {
    'Day': 'Deal of The Day',
    'Week': 'Deal of The Week',
    'Month': 'Deal of The Month',
}