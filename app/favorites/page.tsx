import HeaderTemplate from "@/app/shared/HeaderTemplate";
import FavoritesSection from "../../src/app/favorites/FavoritesSection";
import FooterTemplate from "@/app/shared/FooterTemplate";

function favorites() {
    return (<>
    <HeaderTemplate/>
    <FavoritesSection/>
    <FooterTemplate/>
    </>);
}

export default favorites;