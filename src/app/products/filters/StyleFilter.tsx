import styles from "./StyleFilter.module.css";


interface Props {
    styles : string[],
    onStyleSelect: (arg: string) => void
}

function StyleFilter(props : Props) {
    return (<div className={styles.container}>
        <div>
            
        </div>
        <div className={styles.contentContainer}>
            {props.styles.map((item) => (<label onClick={() => props.onStyleSelect(item)}> 
                <input type='checkbox'/>
                {item}
            </label>))}
        </div>
    </div>);
}

export default StyleFilter;