
function SaleProductDisplayCard(props)
{
    return (<div>
        <div>
            <p>{props.saleTimeSpan}</p>
            <p>{props.saleTimeRemaining}</p>
            <p>hour : min : sec</p>
        </div>
        <div>
            <img src='/photo bag.png'/>
        </div>
        <div>
            <p>{props.productBrand}</p>
            <p>{props.productName}</p>
        </div>
        <div>
            <div>
                {props.productRating <= 1 && <img src='/star.png'/>}
                {props.productRating <= 2 && <img src='/star.png'/>}
                {props.productRating <= 3 && <img src='/star.png'/>}
                {props.productRating <= 4 && <img src='/star.png'/>}
                {props.productRating <= 5 && <img src='/star.png'/>}
            </div>
            <div>
                <p>({props.reviewsCount})</p>
            </div>
        </div>
        <div>
            <div>
                <p>{props.reducedPrice}</p>
            </div>
            <div>
                <p>{props.originalPrice}</p>
            </div>
            <div>
                <p>-{(props.reducedPrice / props.originalPrice) * 100}%</p>
            </div>
        </div>
    </div>);
}

export default SaleProductDisplayCard;