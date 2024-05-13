import FilterHeading from "./FilterHeading";
import styles from "./ModelFilter.module.css";


interface Props {
    modelDetails: ModelDetail[],
    onModelSelect: (arg : string) => void
}

export interface ModelDetail  {
    type: string,
    quantity: number
}

function ModelFilter(props : Props) {
    return (<div className={styles.container}>
        <div>
            <FilterHeading headingText={"MODEL"}/>
        </div>
        <div className={styles.contentContainer}>
            {props.modelDetails.map((item) => (<div onClick={() => props.onModelSelect(item.type)} key={item.type} className={styles.buttonContainer}>
                <p>{item.type}</p>
                <p>{item.quantity}</p>
            </div>))}
        </div>
    </div>);
}

export default ModelFilter;