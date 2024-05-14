import FilterHeading from "./FilterHeading";
import styles from "./StyleFilter.module.css";


interface Props {
    styles : string[],
    onStyleSelect: (arg: string) => void
}

function StyleFilter(props : Props) {

    return (<div className={styles.container}>
        <FilterHeading headingText={"STYLE"}/>
        <div className={styles.contentContainer}>
            {props.styles.map((item) => (<label className={styles.label} key={item} htmlFor="stylebox" onClick={() => props.onStyleSelect(item)}> 
                <input className={styles.checkBox} name="stylebox" type='checkbox'/>
                <span className={styles.labelText}>{item}</span>
            </label>))}
        </div>
    </div>);
}

export default StyleFilter;