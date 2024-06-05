import '@/components/globals.css';
import HeaderTemplate from '../../src/components/shared/HeaderTemplate';
import FooterTemplate from "../../src/components/shared/FooterTemplate";
import SignInForm from '../../src/components/account/SignInForm';


function login()
{
    return (<>
        <HeaderTemplate/>
        <SignInForm/>
        <FooterTemplate/>
    </>);
}

export default login;