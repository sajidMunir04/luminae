import styles from "./StyleFilter.module.css";


interface Props {
    styles : string[]
}

function StyleFilter(props : Props) {
    return (<div className={styles.container}>
        <div>
            
        </div>
        <div className={styles.contentContainer}>
            {props.styles.map((item) => (<label>
                <input type='checkbox'/>
                {item}
            </label>))}
        </div>
    </div>);
}

export default StyleFilter;