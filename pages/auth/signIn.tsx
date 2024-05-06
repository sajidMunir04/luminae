import '@/app/globals.css';
import HeaderTemplate from '../../src/app/shared/HeaderTemplate';
import FooterTemplate from "../../src/app/shared/FooterTemplate";
import SignInForm from '../../src/app/account/SignInForm';


function login()
{
    return (<>
        <HeaderTemplate/>
        <SignInForm/>
        <FooterTemplate/>
    </>);
}

export default login;