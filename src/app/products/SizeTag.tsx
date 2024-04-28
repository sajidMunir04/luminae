import styles from "./SizeTag.module.css";


interface Props {
    tag: string
}

function SizeTag(props : Props) {
    return (<div className={styles.container}>
        <p className={styles.text}>{props.tag}</p>
    </div>);
}

export default SizeTag;