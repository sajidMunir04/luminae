
function ProductDisplayLayoutHeader(props)
{
    return (<div>
        <div>
            <h3>{props.heading}</h3>
        </div>
        <div>
            <a href={props.link}>{props.linkText}</a>
        </div>
    </div>);
}

export default ProductDisplayLayoutHeader;