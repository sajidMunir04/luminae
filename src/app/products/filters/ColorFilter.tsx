import FilterHeading from "./FilterHeading";
import styles from "./ColorFilter.module.css";
import { useState } from "react";

interface Props {
    colors: string[]
    onColorSelect: (arg: string[]) => void
}

function ColorFilter(props : Props) {

    const [selectedColors,setSelectedColors] = useState<string[]>([]);

    const handleColorSelect = (color : string) => {
        if (selectedColors.includes(color))
        {
            const newColors = selectedColors.filter((item) => {item !== color});
            setSelectedColors(newColors);   
            props.onColorSelect(newColors);
        }
        else 
        {
            const newColors = selectedColors;
            newColors.push(color);
            setSelectedColors(newColors);   
            props.onColorSelect(newColors);
        }
    }

    return (<div>
        <FilterHeading headingText={"COLOR"}/>
        <div className={styles.contentContainer}>
        {props.colors.map((item) => (<div onClick={() => handleColorSelect(item)} key={item} 
        className={`${styles.colorSelector} ${selectedColors.includes(item) && styles.selectedColor} ${item === "#FFFFFF" && styles.whiteColor}`} 
        style={{backgroundColor: `${item}`,
                padding: `${selectedColors.includes(item)} && 2%`}}>
                    {selectedColors.includes(item) && <p className={styles.checkMark}>&#x2714;</p>}
        </div>))}
        </div>
    </div>);
}

export default ColorFilter;