import styles from "./ProductSubCategories.module.css";


interface Props{
    categories : string[]
}


function ProductSubCatrgories(props : Props)
{ 
    return (<div className={styles.container}>
        {props.categories.map((item) => (
            <p key={item}>{item}</p>
        ))}
    </div>);
}

export default ProductSubCatrgories;