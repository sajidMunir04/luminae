import '../src/components/globals.css';
import HeaderTemplate from '../src/components/shared/HeaderTemplate';
import FooterTemplate from '../src/components/shared/FooterTemplate';
import ProductsCart from '../src/components/cart/Cart';

function Cart()
{
    return (<>
        <HeaderTemplate/>
        <ProductsCart/>
        <FooterTemplate/>
    </>);
}

export default Cart;