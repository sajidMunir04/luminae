import styles from './FormOrSection.module.css';

function FormOrSection()
{
    return (<div className={styles.container}>
        <div className={styles.empty}></div>
        <p>OR</p>
        <div className={styles.empty}></div>
    </div>);
}

export default FormOrSection;