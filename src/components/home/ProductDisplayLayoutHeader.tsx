import styles from './ProductDisplayLayoutHeader.module.css';


function ProductDisplayLayoutHeader(props)
{
    return (<div className={styles.container}>
        <div className={styles.headingContainer}>
            <h3 className={styles.headingText}>{props.heading}</h3>
        </div>
        <div>
            <a className={styles.link} href={props.link}>{props.linkText + ' '}&#10140;</a>
        </div>
    </div>);
}

export default ProductDisplayLayoutHeader;