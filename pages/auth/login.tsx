import '../src/app/globals.css';
import HeaderTemplate from '../../src/app/shared/HeaderTemplate';
import FooterTemplate from "../../src/app/shared/FooterTemplate";
import StoreInteractionContainer from "../../src/app/shared/ProductCategoriesManager";
import SignInForm from '../../src/app/account/SignInForm';


function login()
{
    return (<>
        <HeaderTemplate/>
        <SignInForm credentials={undefined} />
        <FooterTemplate/>
    </>);
}

export default login;