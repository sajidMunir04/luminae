import SignUpForm from "../../src/app/account/SignUpForm";
import FooterTemplate from "../../src/app/shared/FooterTemplate";
import HeaderTemplate from "../../src/app/shared/HeaderTemplate";
import ProductCategoriesManager from "../../src/app/shared/ProductCategoriesManager";


function signup() {
    return (<>
    <HeaderTemplate/>
    <ProductCategoriesManager/>
    <SignUpForm/>
    <FooterTemplate/>
    </>);
}

export default signup;