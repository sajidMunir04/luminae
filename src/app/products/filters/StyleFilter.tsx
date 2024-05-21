import FilterHeading from "./FilterHeading";
import styles from "./StyleFilter.module.css";


interface Props {
    styles : string[],
    onStyleSelect: (arg: string[]) => void,
    selectedStyles: string[]
}

function StyleFilter(props : Props) {

    const handleStyleSelection = (style: string) => {
        if (props.selectedStyles.includes(style)){
            const filteredModels = props.selectedStyles.filter((item) => item !== style);
            props.onStyleSelect(filteredModels);
        }
        else{
            const filteredModels = props.selectedStyles;
            filteredModels.push(style);
            props.onStyleSelect(filteredModels);
        }
    }
    
    return (<div className={styles.container}>
        <FilterHeading headingText={"STYLE"}/>
        <div className={styles.contentContainer}>
            {props.styles.map((item) => (<label className={styles.label} key={item} htmlFor="stylebox" onClick={() => handleStyleSelection(item)}> 
                <input className={styles.checkBox} name="stylebox" type='checkbox' checked={props.selectedStyles.includes(item)}/>
                <span className={styles.labelText}>{item}</span>
            </label>))}
        </div>
    </div>);
}

export default StyleFilter;