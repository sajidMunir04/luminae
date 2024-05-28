

import { useHover } from "react-use";
import styles from "./ProductSubCategories.module.css";
import { use, useRef, useState } from "react";
import router from "next/router";
import Link from "next/link";
import { useClearRouterQuery } from "../lib/hooks/useClearRouterQuery";


interface Props{
    mainCategory: string,
    categories : string[]
}


function ProductSubCatergories(props : Props)
{ 
    const handleCategoryClick = (category) => {
        useClearRouterQuery();
        router.push(category);
      };
    
    const [isHovered,setHoverState] = useState<boolean>(false);

    return (<div onMouseEnter={() => setHoverState(true)} className={styles.container}><p className={styles.categoryButton}>{props.mainCategory}</p>
        {isHovered && <div onMouseEnter={() => setHoverState(true)} onMouseLeave={() => setHoverState(false)} className={styles.subCategoriescontainer}>
            {props.categories.map((item) => (
                <Link className={styles.categoryLink} onClick={()=>{handleCategoryClick('http://localhost:3000/' + props.mainCategory + '/' + item)}} 
                key={item} href={'http://localhost:3000/' + props.mainCategory + '/' + item}>{item}</Link>
            ))}
        </div>}
    </div>);
}

export default ProductSubCatergories;