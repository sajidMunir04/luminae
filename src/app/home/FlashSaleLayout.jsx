import SaleProductDisplayCard from "../shared/SaleProductDisplayCard";
import ProductDisplayLayoutHeader from "./ProductDisplayLayoutHeader";

function FlashSaleLayout()
{
    return (<div>
        <div>
            <ProductDisplayLayoutHeader heading="Flash Sales" link="#" linkText="View All"/>
        </div>
        <div>
            <SaleProductDisplayCard/>
        </div>
    </div>);
}

export default FlashSaleLayout;