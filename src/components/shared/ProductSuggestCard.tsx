import { Product } from "../utils/Product";

interface Props {
    product : Product
}


function ProductSuggestCard(props : Props)
{
    return (<div>
        <div>
            <img src='/spci.png'/>
        </div>
        <div>
            <div>
                <p>{props.product.name}</p>
            </div>
            <div>
                
            </div>
            <button>
                Add to Cart
            </button>
        </div>
    </div>);
}

export default ProductSuggestCard;