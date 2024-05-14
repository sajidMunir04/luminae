import FilterHeading from "./FilterHeading";
import styles from "./PriceFilter.module.css";
import ReactSlider from "react-slider";


interface Props {
    minimumPrice: number,
    maximumPrice: number
}

function PriceFilter(props : Props) {

    const handleInput = (e) => {

    };    

    return (<div className={styles.container}>
        <FilterHeading headingText="PRICE"/>
        <div className={styles.contentContainer}>
            <div className={styles.pricefieldsContainer}>
                <input className={styles.inputField} type='number' placeholder={`$ ${props.minimumPrice}`} />
                <div>

                </div>
                <input className={styles.inputField} type='number' placeholder={`$ ${props.maximumPrice}`} value={'$'} />
            </div>
            <div className={styles.rangeContainer}>
                <ReactSlider/>
            </div>
            <div className={styles.priceInfoContainer}>
                <p className={styles.priceInfo}>Minimum:${props.minimumPrice}</p>
                <p className={styles.priceInfo}>Maximum:${props.maximumPrice}</p>
            </div>
        </div>
    </div>);
}

export default PriceFilter;