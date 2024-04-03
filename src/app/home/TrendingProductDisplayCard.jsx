
function TrendingProductDisplayCard(props)
{
    return (<div>
        <div>
            <div>
                <img src="/4_org_zoom 1.png"/>
            </div>
            <div>
                {props.isNewArrival && <div>
                    <img src='/IconNew arivals.png'/>
                    <p>New Arrivals</p>
                </div>}
            </div>
        </div>
        <div>
            <div>
                <p>{props.brandName}</p>
                <p>{props.productName}</p>
            </div>
            <div>
                <a href={props.productLink}>{props.productPrice} Shop Noww</a>
            </div>
        </div>
    </div>);
}

export default TrendingProductDisplayCard;