import FilterHeading from "./FilterHeading";
import styles from "./ColorFilter.module.css";

interface Props {
    colors: string[]
}

function ColorFilter(props : Props) {
    return (<div>
        <div>
            <FilterHeading headingText={"COLOR"}/>
        </div>
        <div className={styles.contentContainer}>
        {props.colors.map((item) => (<div className={styles.colorSelector} style={{backgroundColor: `${item}`}}>
        </div>))}
        </div>
    </div>);
}

export default ColorFilter;