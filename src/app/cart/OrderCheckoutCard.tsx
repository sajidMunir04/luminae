
function OrderCheckoutCard(props)
{
    return (<div>
        <div>
            <p>Order Summary</p>
        </div>
        <div>
            <div>
                <p>Price</p>
                <p>{props.totalPrice}</p>
            </div>
            <div>
                <p>Shipping</p>
                <p>{props.shippingCost}</p>
            </div>
            <div>
                <p>Tax</p>
                <p>{props.totalTax}</p>
            </div>
        </div>
        <div>
            <p>Discount Code</p>
            <form>
                <input type="text"/>
                <button type="submit"/>
            </form>
        </div>
        <div>
            <label>
                <input type="checkbox"/>
            Pack in a Gift Box</label>
        </div>
        <div>
            <p>Total Price</p>
            <p>{props.totalPrice + props.shippingCost + props.totalTax}</p>
        </div>
    </div>);
}

export default OrderCheckoutCard;