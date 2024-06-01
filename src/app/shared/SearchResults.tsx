import Image from "next/image";
import styles from "./SearchResults.module.css";
import { setCookie } from "cookies-next";

export interface SearchResult {
    _id: string,
    images: string[];
    productName: string,
    productPrie: number
}

interface Props {
    searchResults : SearchResult[]
}

function SearchResults(props : Props) {

    const handleClick = (productId : string) => {
        setCookie('productPageId',productId);
    }

    return (<div className={styles.container}>
        {props?.searchResults.map((item) => (
            <a className={styles.searchResult} onClick={() => handleClick(item._id)} key={item.productName + Math.random()} href={`/item/${item._id}`}>
                <div className={styles.imageContainer}>
                    <Image className={styles.image} src={item.images[0]} alt={"product image"} width={'60'} height={'100'}/>
                </div>
                <div className={styles.productInfoContainer}>
                    <p className={styles.nameText}>{item.productName.substring(0,26)}{item.productName.length > 26 && '...'}</p>
                    <p className={styles.priceText}>$ {item.productPrie}</p>
                </div>
                <p className={styles.viewText}>View</p>
            </a>
        ))}
    </div>);
}

export default SearchResults;