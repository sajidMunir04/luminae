import { useState } from "react";
import styles from "./OptionCard.module.css";


interface Props {
    heading: string,
    logoLink: string,
    info: string,
    onClick: () => void,
    selected: boolean
}


function OptionCard(props : Props) {

    return (<div className={`${styles.container} ${props.selected && styles.containerSelected}`}>
        <div onClick={props.onClick} className={styles.header}>
            <div className={`${styles.checkBox} ${props.selected && styles.checkBoxSelected}`}></div>
            <h5>{props.heading}</h5>
            <div>
                <img src={props.logoLink} alt="service logo"/>
            </div>
        </div>
        <p onClick={props.onClick} className={styles.infoText}>{props.info}</p>
    </div>);
}

export default OptionCard;