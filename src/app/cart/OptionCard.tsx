import { useState } from "react";
import styles from "./OptionCard.module.css";


interface Props {
    heading: string,
    logoLink: string,
    info: string
}


function OptionCard(props : Props) {

    const [isSelected,setSelected] = useState(false);

    return (<div className={styles.container}>
        <div className={styles.header}>
            <div className={styles.checkBox}>

            </div>
            <h5>{props.heading}</h5>
            <div>
                <img src={props.logoLink} alt="service logo"/>
            </div>
        </div>
        <div>

        </div>
    </div>);
}

export default OptionCard;