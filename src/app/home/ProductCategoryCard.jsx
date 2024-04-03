

function ProductCategoryCard(props)
{
    return (<div>
        <div>
            <div>
            <p>
                {props.categoryInfo}
            </p>
            <p>
                {props.itemsDetail}
            </p>
            </div>
            <div>
                <a href={props.link}>Explore All Category</a>
            </div>
        </div>
        <div>
            <img src='/Rectangle 1078.png'/>
        </div>
    </div>);
}

export default ProductCategoryCard;