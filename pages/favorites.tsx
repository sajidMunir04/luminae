import FavoritesSection from "../src/app/favorites/FavoritesSection";
import FooterTemplate from "../src/app/shared/FooterTemplate";
import HeaderTemplate from "../src/app/shared/HeaderTemplate";
import StoreInteractionContainer from "../src/app/shared/ProductCategoriesManager";

function favorites() {
    return (<>
    <HeaderTemplate/>
    <StoreInteractionContainer/>
    <FavoritesSection/>
    <FooterTemplate/>
    </>);
}

export default favorites;