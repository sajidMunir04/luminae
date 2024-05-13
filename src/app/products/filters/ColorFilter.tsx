import FilterHeading from "./FilterHeading";
import styles from "./ColorFilter.module.css";
import { useState } from "react";

interface Props {
    colors: string[]
    onColorSelect: (arg: string) => void
}

function ColorFilter(props : Props) {

    const [selectedColors,setSelectedColors] = useState<string[]>([]);

    return (<div>
        <FilterHeading headingText={"COLOR"}/>
        <div className={styles.contentContainer}>
        {props.colors.map((item) => (<div onClick={() => props.onColorSelect(item)} key={item} className={styles.colorSelector} 
        style={{backgroundColor: `${item}`,
                padding: `${selectedColors.includes(item)} && 2%`,
                border: `${selectedColors.includes(item)} && 2px solid black`}}>
        </div>))}
        </div>
    </div>);
}

export default ColorFilter;