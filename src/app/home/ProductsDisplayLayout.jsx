import ProductDisplayCard from "./ProductDisplayCard";
import ProductDisplayLayoutHeader from "./ProductDisplayLayoutHeader";


function ProductsDisplayLayout()
{
    return (<div>
        <div>
            <ProductDisplayLayoutHeader heading="Top 100" link="#" linkText="View All"/>
        </div>
        <div>
            <ProductDisplayCard/>
        </div>
    </div>);
}

export default ProductsDisplayLayout;