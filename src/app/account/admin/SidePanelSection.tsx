import styles from './SidePanelSection.module.css';


function SidePanelSection(props)
{
    return (<div onClick={props.onClick} className={styles.container}>
        <img className={styles.img} src="/icon(2).png"/>
        <p>{props.name}</p>
    </div>)
}

export default SidePanelSection;