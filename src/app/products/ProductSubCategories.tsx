

import { useHover } from "react-use";
import styles from "./ProductSubCategories.module.css";
import { use, useRef, useState } from "react";
import router from "next/router";


interface Props{
    mainCategory: string,
    categories : string[]
}


function ProductSubCatergories(props : Props)
{ 
    const handleCategoryClick = (category) => {
        router.push(category);
      };
    
    const [isHovered,setHoverState] = useState<boolean>(false);

    return (<div onMouseEnter={() => setHoverState(true)} className={styles.container}><p>{props.mainCategory}</p>
        {isHovered && <div onMouseLeave={() => setHoverState(false)} className={styles.subCategoriescontainer}>
            {props.categories.map((item) => (
                <a className={styles.categoryLink} onClick={()=>{handleCategoryClick('http://localhost:3000/' + props.mainCategory + '/' + item)}} 
                key={item} href={'http://localhost:3000/' + props.mainCategory + '/' + item}>{item}</a>
            ))}
        </div>}
    </div>);
}

export default ProductSubCatergories;