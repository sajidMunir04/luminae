import { useState } from "react";
import styles from "./OptionCard.module.css";


interface Props {
    heading: string,
    logoLink: string,
    info: string,
    onClick: (arg : any) => void,
    selected: boolean
}


function OptionCard(props : Props) {

    const [isSelected,setSelected] = useState(false);

    return (<div onClick={() => props.onClick} className={`${styles.container} ${props.selected && styles.containerSelected}`}>
        <div className={styles.header}>
            <div className={`${styles.checkBox} ${props.selected && styles.checkBoxSelected}`}>

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