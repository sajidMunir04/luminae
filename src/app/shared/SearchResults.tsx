import Image from "next/image";
import styles from "./SearchResults.module.css";

export interface SearchResult {
    images: string[];
    productName: string,
    productPrie: number
}

interface Props {
    searchResults : SearchResult[]
}

function SearchResults(props : Props) {
    return (<div className={styles.container}>
        {props?.searchResults.map((item) => (
            <a className={styles.searchResult} key={item.productName + Math.random()} href="#">
                <div className={styles.imageContainer}>
                    <Image className={styles.image} src={item.images[0]} alt={"product image"} width={'60'} height={'100'}/>
                </div>
                <div className={styles.productInfoContainer}>
                    <p className={styles.nameText}>{item.productName.substring(0,26)}{item.productName.length > 26 && '...'}</p>
                    <p className={styles.priceText}>$ {item.productPrie}</p>
                </div>
                <p>&#10138;</p>
            </a>
        ))}
    </div>);
}

export default SearchResults;