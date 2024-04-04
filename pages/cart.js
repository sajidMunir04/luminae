import '../src/app/globals.css';

import HeaderTemplate from '../src/app/shared/HeaderTemplate';
import StoreInteractionContainer from "../src/app/shared/StoreInteractionContainer";
import CartLayout from "../src/app/cart/CartLayout";

function Cart()
{
    return (<>
        <HeaderTemplate/>
        <StoreInteractionContainer/>
        <CartLayout/>
    </>);
}

export default Cart;