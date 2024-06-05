import FilterHeading from "./FilterHeading";
import styles from "./PriceFilter.module.css";
import { ChangeEvent, useRef, useState } from "react";


interface Props {
    minimumPrice: number,
    maximumPrice: number,
    onPriceChange: (range: number[]) => void
}

function PriceFilter(props : Props) {

    const [minRange,setMinRange] = useState(props.minimumPrice);
    const [maxRange,setMaxRange] = useState(props.maximumPrice);
    const minFieldRef = useRef<HTMLInputElement>(null);
    const maxFieldRef = useRef<HTMLInputElement>(null);

    const handleMinRangeInput = (e : ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value.substring(1));
        if (typeof(value) === 'number' && value < maxRange) {
            setMinRange(value);
        }
    };    

    const applyFilter = () => {
        props.onPriceChange([minRange,maxRange]);
    }

    const handleMaxRangeInput = (e : ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value.substring(1));
        if (typeof(value) === 'number' && value > minRange) {
            setMaxRange(value);
        }
    }

    const handleMinFieldFocus = () => {

        if (minFieldRef.current) {
            minFieldRef.current.value = '$';
        }
    }

    const handleMaxFieldFocus = () => {
        if (maxFieldRef.current) {
            maxFieldRef.current.value = '$';
        }
    }

    return (<div className={styles.container}>
        <FilterHeading headingText="PRICE"/>
        <div className={styles.pricefieldsContainer}>
                <input className={styles.inputField} ref={minFieldRef} onFocus={handleMinFieldFocus} type='text' placeholder={`$ ${props.minimumPrice}`} onChange={handleMinRangeInput}/>
                <div>

                </div>
                <input className={styles.inputField} ref={maxFieldRef} onFocus={handleMaxFieldFocus} type='text' placeholder={`$ ${props.maximumPrice}`} onChange={handleMaxRangeInput} />
        </div>
        <button className={styles.applyButton} onClick={applyFilter}>Apply</button>
    </div>);
}

export default PriceFilter;