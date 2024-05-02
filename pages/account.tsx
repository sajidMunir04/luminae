import '../src/app/globals.css';

import HeaderTemplate from '../src/app/shared/HeaderTemplate';
import AccountFormsLayout from "../src/app/account/AccountFormsLayout";
import FooterTemplate from "../src/app/shared/FooterTemplate";
import StoreInteractionContainer from "../src/app/shared/ProductCategoriesManager";

function account()
{
    return (<>
        <HeaderTemplate/>
        <StoreInteractionContainer/>
        <AccountFormsLayout/>
        <FooterTemplate/>
    </>);
}

export default account;