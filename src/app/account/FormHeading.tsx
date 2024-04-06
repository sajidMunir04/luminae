import styles from './FormHeading.module.css';

function FormHeading(props)
{
    return (<p className={styles.content}>{props.heading}</p>);
}

export default FormHeading;