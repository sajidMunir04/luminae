import styles from "./ProductSubCategories.module.css";
import { useState } from "react";
import router from "next/router";
import Link from "next/link";
import { useClearRouterQuery } from "../lib/hooks/useClearRouterQuery";
import {motion} from "framer-motion";


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

    return (<div onMouseEnter={() => setHoverState(true)} className={styles.container}><motion.p className={styles.categoryButton} whileHover={{scale: 1.5}}>{props.mainCategory}</motion.p>
        {isHovered && <motion.div  initial={{scaleX: 0}} whileInView={{scaleX: 1}} onMouseEnter={() => setHoverState(true)} onMouseLeave={() => setHoverState(false)} className={styles.subCategoriescontainer}>
            {props.categories.map((item) => (
                <motion.a className={styles.categoryLink} whileHover={{scale: 1.05}} onClick={()=>{handleCategoryClick('http://localhost:3000/' + props.mainCategory + '/' + item)}} 
                key={item} href={'http://localhost:3000/' + props.mainCategory + '/' + item}>{item}</motion.a>
            ))}
        </motion.div>}
    </div>);
}

export default ProductSubCatergories;