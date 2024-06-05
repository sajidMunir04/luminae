import SignUpForm from "../../src/components/account/SignUpForm";
import FooterTemplate from "../../src/components/shared/FooterTemplate";
import HeaderTemplate from "../../src/components/shared/HeaderTemplate";


function signup() {
    return (<>
    <HeaderTemplate/>
    <SignUpForm/>
    <FooterTemplate/>
    </>);
}

export default signup;