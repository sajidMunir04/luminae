import styles from './ProductDisplayLayoutHeader.module.css';


function ProductDisplayLayoutHeader(props)
{
    return (<div className={styles.container}>
        <div>
            <h3>{props.heading}</h3>
        </div>
        <div>
            <a href={props.link}>{props.linkText}</a>
        </div>
    </div>);
}

export default ProductDisplayLayoutHeader;