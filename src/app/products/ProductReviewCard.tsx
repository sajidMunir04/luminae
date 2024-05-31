import { useRouter } from "next/router";
import styles from "./ProductReviewCard.module.css";
import { useState } from "react";

interface Props{
    reviewHeading: string,
    reviewText: string,
    reviewerName: string,
    likeCount: number,
    dislikeCount: number,
    rating: number,
    reviewId: string
}

function ProductReviewCard(props : Props) {

    const [likesCount,setLikesCount] = useState(props.likeCount);
    const [dislikesCount,setDislikesCount] = useState(props.dislikeCount);

    const handleLike = () => {
        setLikesCount(likesCount + 1);
        updateDatabase();
    }

    const handleDisLike = () => {
        setDislikesCount(dislikesCount + 1);
        updateDatabase();
    }


    const updateDatabase = async() => {
        const updateData : Record< string, string | number> = {
            reviewId: props.reviewId,
            likes: likesCount,
            dislikes: dislikesCount
        }

        const response = await fetch('/api/updateProductReviewStats',{
            method: "POST",
            body: JSON.stringify(updateData) 
        })
        const data = await response.json();
        console.log(data);
    }
    

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
                <div className={styles.reviewStatInfo} onClick={handleLike}>
                    <img className={styles.reviewStatImage} src="/images/product/like.svg"/>
                    <p className={styles.reviewStatText}>{likesCount}</p>
                </div>
                <div className={styles.middleBorder}></div>
                <div className={styles.reviewStatInfo} onClick={handleDisLike}>
                    <img className={styles.reviewStatImage} src="/images/product/dislike.svg"/>
                    <p className={styles.reviewStatText}>{dislikesCount}</p>
                </div>
            </div>
        </div>
        <div>
            <p>{props.reviewText}</p>
        </div>
    </div>);
}

export default ProductReviewCard;