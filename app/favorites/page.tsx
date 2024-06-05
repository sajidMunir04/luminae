import HeaderTemplate from "@/components/shared/HeaderTemplate";
import FavoritesSection from "../../src/components/favorites/FavoritesSection";
import FooterTemplate from "@/components/shared/FooterTemplate";

function favorites() {
    return (<>
    <HeaderTemplate/>
    <FavoritesSection/>
    <FooterTemplate/>
    </>);
}

export default favorites;