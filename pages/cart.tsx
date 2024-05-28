import '../src/app/globals.css';
import HeaderTemplate from '../src/app/shared/HeaderTemplate';
import StoreInteractionContainer from "../src/app/shared/ProductCategoriesManager";
import FooterTemplate from '../src/app/shared/FooterTemplate';
import ProductsCart from '../src/app/cart/Cart';

function Cart()
{
    return (<>
        <HeaderTemplate/>
        <ProductsCart/>
        <FooterTemplate/>
    </>);
}

export default Cart;