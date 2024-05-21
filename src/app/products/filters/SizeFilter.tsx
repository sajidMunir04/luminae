import SizeTag from "../SizeTag";
import FilterHeading from "./FilterHeading";
import styles from "./SizeFilter.module.css";

interface Props {
    sizes: string[],
    selectedSizes: string[],
    onSizeSelect: (sizes : string[]) => void
}

function SizeFilter(props : Props) {

    const handleModelSelection = (size: string) => {
        if (props.selectedSizes.includes(size)){
            const filteredModels = props.selectedSizes.filter((item) => item !== size);
            props.onSizeSelect(filteredModels);
        }
        else{
            const filteredModels = props.selectedSizes;
            filteredModels.push(size);
            props.onSizeSelect(filteredModels);
        }
    }

    return (<div className={styles.container}>
        <FilterHeading headingText={"SIZES"}/>
        <div className={styles.contentContainer}>
            {props.sizes.map((item) => (<div className={`${styles.sizeTag} ${props.selectedSizes.includes(item) && styles.selectedTag}`} key={item} onClick={() => {handleModelSelection(item)}}><p className={styles.tagText}>{item}</p></div>))}
        </div>
    </div>);
}

export default SizeFilter;