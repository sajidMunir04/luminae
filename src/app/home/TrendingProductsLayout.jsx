const { default: ProductDisplayLayoutHeader } = require("./ProductDisplayLayoutHeader");
const { default: TrendingProductDisplayCard } = require("./TrendingProductDisplayCard");

function TrendingProductsLayout()
{
    return (<div>
        <div>
            <ProductDisplayLayoutHeader heading="Trending Products" link="#" linkText="View All"/>
        </div>
        <div>
            <TrendingProductDisplayCard/>
        </div>
    </div>);
}

export default TrendingProductsLayout;