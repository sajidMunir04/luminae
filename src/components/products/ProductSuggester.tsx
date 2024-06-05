import ProductSuggestCard from "../shared/ProductSuggestCard";
import { Product } from "../utils/Product";

interface Props {
    products: Product[]
}

function ProductSuggester(props : Props) {
    return (<div>
        <h4>YOU MIGHT ALSO LIKE</h4>
        <div>
            {props.products.map((product) => <ProductSuggestCard key={product._id} product={product}/>)}
        </div>    
    </div>);
}

export default ProductSuggester;