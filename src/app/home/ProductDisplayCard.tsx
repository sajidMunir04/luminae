
function ProductDisplayCard(props)
{
    return (<div>
        <div>
            <img src='/photo.png'/>
        </div>
        <div>
            <div>
                    <div>
                        <p>{props.brandName}</p>
                        <div>
                            <p>{props.productName}</p>
                            <p>{props.productColor}</p>
                            <p>{props.productFitting}</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            {props.productRating >= 1 && <img src="/star(1).png"/>}
                            {props.productRating >= 2 && <img src="/star(1).png"/>}
                            {props.productRating >= 3 && <img src="/star(1).png"/>}
                            {props.productRating >= 4 && <img src="/star(1).png"/>}
                            {props.productRating >= 5 && <img src="/star(1).png"/>}
                        </div>
                        <div>
                            {props.reviewCount}
                        </div>
                    </div>
                    <div>
                        <div>
                            <p>{props.currentPrice}</p>
                        </div>
                        {props.originalPrice != 0 && <div>
                            <p>{props.originalPrice}</p>
                        </div>}
                        {props.originalPrice != 0 && 
                        <div>
                            <p>{(props.currentPrice / props.originalPrice) * 100}%</p>
                        </div>
                        }
                    </div>
            </div>
            <div>
                <div>
                    <img src="/Vector.png"/>
                        
                </div>
            </div>
        </div>
    </div>);
}

export default ProductDisplayCard;