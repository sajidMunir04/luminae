import styles from './BrandAdvertCard.module.css';

function BrandAdvertCard(props)
{
    return (<div className={styles.container}>
        <div>
            <p>{props.brandName}</p>
            <p>{props.text}</p>
        </div>
        <div>
            <div>
                <img src="/Iphone.png"/>
            </div>
        </div>
    </div>);
}

export default BrandAdvertCard;