import '../src/app/globals.css';

import HeaderTemplate from '../src/app/shared/HeaderTemplate';
import StoreInteractionContainer from "../src/app/shared/StoreInteractionContainer";
import SignInForm from "../src/app/account/SignInForm";

function account()
{
    return (<>
        <HeaderTemplate/>
        <StoreInteractionContainer/>
        <SignInForm/>
    </>);
}

export default account;