import FilterHeading from "./FilterHeading";
import styles from "./ModelFilter.module.css";


interface Props {
    modelDetails: ModelDetail[],
    onModelSelect: (arg : string[]) => void,
    selectedModels: string[]
}

export interface ModelDetail  {
    type: string,
    quantity: number
}

function ModelFilter(props : Props) {

    const handleModelSelection = (model: string) => {
        if (props.selectedModels.includes(model)){
            const filteredModels = props.selectedModels.filter((item) => item !== model);
            props.onModelSelect(filteredModels);
        }
        else{
            const filteredModels = props.selectedModels;
            filteredModels.push(model);
            props.onModelSelect(filteredModels);
        }
    }

    return (<div className={styles.container}>
        <div>
            <FilterHeading headingText={"MODEL"}/>
        </div>
        <div className={styles.contentContainer}>
            {props.modelDetails.map((item) => (<div onClick={() => handleModelSelection(item.type)} key={item.type} className={`${styles.buttonContainer} ${props.selectedModels.includes(item.type) && styles.buttonActive}`}>
                <p key={item.type + 'a'} className={styles.button}>{item.type}</p>
                <p key={item.type + 'b'} className={styles.button}>{item.quantity}</p>
            </div>))}
        </div>
    </div>);
}

export default ModelFilter;