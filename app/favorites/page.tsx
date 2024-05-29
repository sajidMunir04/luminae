import Head from "next/head";
import FavoritesSection from "../../src/app/favorites/FavoritesSection";

function favorites() {
    return (<>
    <Head>
        <title>My Favorites</title>
    </Head>
    <FavoritesSection/>
    </>);
}

export default favorites;