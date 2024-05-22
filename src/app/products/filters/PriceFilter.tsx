import FilterHeading from "./FilterHeading";
import styles from "./PriceFilter.module.css";
import * as Slider from '@radix-ui/react-slider';


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
                <input className={styles.inputField} type='number' placeholder={`$ ${props.maximumPrice}`} />
            </div>
            <form className={styles.priceRangeContainer}>
                <Slider.Root className="SliderRoot" defaultValue={[50]} max={100} step={1}>
                <Slider.Track className="SliderTrack">
                    <Slider.Range className="SliderRange" />
                </Slider.Track>
                <Slider.Thumb className="SliderThumb" aria-label="Volume" />
                </Slider.Root>
            </form>
            <div className={styles.priceInfoContainer}>
                <p className={styles.priceInfo}>Minimum:${props.minimumPrice}</p>
                <p className={styles.priceInfo}>Maximum:${props.maximumPrice}</p>
            </div>
        </div>
    </div>);
}

export default PriceFilter;