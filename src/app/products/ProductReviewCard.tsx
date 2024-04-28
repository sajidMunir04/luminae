

interface Props{
    reviewHeading: string,
    reviewText: string,
    reviewerName: string,
    likeCount: number,
    dislikeCount: number,
    rating: number
}

function ProductReviewCard(props : Props) {
    return (<div>
        <div>
            <div>
                <div></div>
                <div></div>
            </div>
            <div>
                <div>
                    <img src="/images/product/like.svg"/>
                    <p>{props.likeCount}</p>
                </div>
                <div>
                    <img src="/images/product/dislike.svg"/>
                    <p>{props.dislikeCount}</p>
                </div>
            </div>
        </div>
        <div>

        </div>
    </div>);
}

export default ProductReviewCard;