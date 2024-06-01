import styles from "./ProductSubCategories.module.css";
import { useState } from "react";
import router from "next/router";
import {motion} from "framer-motion";
import { setCookie } from "cookies-next";
import { routerQueryForProductPagination } from "../lib/constants";


interface Props{
    mainCategory: string,
    categories : string[]
}


function ProductSubCatergories(props : Props)
{ 
    const handleCategoryClick = (category) => {
        setCookie(routerQueryForProductPagination, undefined);
        router.push(category);
      };
    
    const [isHovered,setHoverState] = useState<boolean>(false);

    return (<div onMouseEnter={() => setHoverState(true)} onTouchStart={() => setHoverState(true)} className={styles.container}><motion.p className={styles.categoryButton} whileHover={{scale: 1.5}}>{props.mainCategory}</motion.p>
        {isHovered && <motion.div  initial={{scaleX: 0}} whileInView={{scaleX: 1}} onMouseEnter={() => setHoverState(true)} onTouchStart={() => setHoverState(true)} onMouseLeave={() => setHoverState(false)} onTouchCancel={() => setHoverState(false)} className={styles.subCategoriescontainer}>
            {props.categories.map((item) => (
                <motion.a className={styles.categoryLink} whileHover={{scale: 1.05}} onClick={()=>{handleCategoryClick(process.env.BASE_URL + props.mainCategory + '/' + item)}} 
                key={item} href={process.env.BASE_URL + props.mainCategory + '/' + item}>{item}</motion.a>
            ))}
        </motion.div>}
    </div>);
}

export default ProductSubCatergories;