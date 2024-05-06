import SignUpForm from "../../src/app/account/SignUpForm";
import FooterTemplate from "../../src/app/shared/FooterTemplate";
import HeaderTemplate from "../../src/app/shared/HeaderTemplate";


function signup() {
    return (<>
    <HeaderTemplate/>
    <SignUpForm/>
    <FooterTemplate/>
    </>);
}

export default signup;