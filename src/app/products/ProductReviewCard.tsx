import styles from "./ProductReviewCard.module.css";

interface Props{
    reviewHeading: string,
    reviewText: string,
    reviewerName: string,
    likeCount: number,
    dislikeCount: number,
    rating: number
}

function ProductReviewCard(props : Props) {

    return (<div className={styles.container}>
        <div className={styles.header}>
            <div>
                <div>
                    {props.rating === 5 && <img src="/images/product/Star.svg"/>}
                    {props.rating >= 4 && <img src="/images/product/Star.svg"/>}
                    {props.rating >= 3 && <img src="/images/product/Star.svg"/>}
                    {props.rating >= 2 && <img src="/images/product/Star.svg"/>}
                    {props.rating >= 1 && <img src="/images/product/Star.svg"/>}
                </div>
                <div>
                    <p className={styles.reviewHeading}>{props.reviewHeading}</p>
                    <p className={styles.reviewAuthorText}>By {props.reviewerName}</p>
                </div>
            </div>
            <div className={styles.reviewStatsContainer}>
                <div className={styles.reviewStatInfo}>
                    <img className={styles.reviewStatImage} src="/images/product/like.svg"/>
                    <p className={styles.reviewStatText}>{props.likeCount}</p>
                </div>
                <div className={styles.middleBorder}></div>
                <div className={styles.reviewStatInfo}>
                    <img className={styles.reviewStatImage} src="/images/product/dislike.svg"/>
                    <p className={styles.reviewStatText}>{props.dislikeCount}</p>
                </div>
            </div>
        </div>
        <div>
            <p>{props.reviewText}</p>
        </div>
    </div>);
}

export default ProductReviewCard;