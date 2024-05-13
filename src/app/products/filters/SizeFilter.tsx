import SizeTag from "../SizeTag";
import FilterHeading from "./FilterHeading";
import styles from "./SizeFilter.module.css";

interface Props {
    sizes: string[],
    selectedSizes: string[],
    onSizeSelect: (sizes : string[]) => void
}

function SizeFilter(props : Props) {




    return (<div className={styles.container}>
        <FilterHeading headingText={"SIZES"}/>
        <div className={styles.contentContainer}>
            {props.sizes.map((item) => (<div key={item} onClick={() => {
                let sizes = props.selectedSizes;
                if (sizes.includes(item))
                    sizes = sizes.filter((size) => size !== item);
                else
                    sizes.push(item);

                props.onSizeSelect(sizes);
            }}><p>{item}</p></div>))}
        </div>
    </div>);
}

export default SizeFilter;