import SizeTag from "../SizeTag";
import FilterHeading from "./FilterHeading";
import styles from "./SizeFilter.module.css";

interface Props {
    sizes: string[]
}

function SizeFilter(props : Props) {
    return (<div className={styles.container}>
        <FilterHeading headingText={"SIZES"}/>
        <div className={styles.contentContainer}>
            {props.sizes.map((item) => (<SizeTag tag={item}/>))}
        </div>
    </div>);
}

export default SizeFilter;