

import { useHover } from "react-use";
import styles from "./ProductSubCategories.module.css";
import { use, useRef } from "react";
import router from "next/router";


interface Props{
    mainCategory: string,
    categories : string[],
    onMouseLeave: () => void
}


function ProductSubCatrgories(props : Props)
{ 
    const handleCategoryClick = (category) => {
        router.push(category);
      };
    

    return (<div className={styles.container}>
        {props.categories.map((item) => (
            <a onClick={()=>{handleCategoryClick(props.mainCategory + '/' + item)}} 
            key={item} href={props.mainCategory + '/' + item}>{item}</a>
        ))}
    </div>);
}

export default ProductSubCatrgories;