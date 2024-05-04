import '../src/app/globals.css';

import HeaderTemplate from '../src/app/shared/HeaderTemplate';
import FooterTemplate from "../src/app/shared/FooterTemplate";
import StoreInteractionContainer from "../src/app/shared/ProductCategoriesManager";
import SignInForm from '../src/app/account/SignInForm';

function account()
{
    return (<>
        <HeaderTemplate/>
        <StoreInteractionContainer/>
        <SignInForm />
        <FooterTemplate/>
    </>);
}

export default account;