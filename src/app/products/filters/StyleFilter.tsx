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
            {props.styles.map((item) => (<label htmlFor="stylebox" onClick={() => props.onStyleSelect(item)}> 
                <input name="stylebox" type='checkbox'/>
                {item}
            </label>))}
        </div>
    </div>);
}

export default StyleFilter;