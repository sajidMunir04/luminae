
interface Props {
    minimumPrice: number,
    maximumPrice: number
}

function PriceFilter(props : Props) {
    return (<div>

        <div>
            <div>
                <div>
                    <input type='number' placeholder={`$${props.minimumPrice}`} />
                </div>
                <div>

                </div>
                <div>
                    <input type='number' placeholder={`$${props.maximumPrice}`} />
                </div>
            </div>
            <div>

            </div>
            <div>
                <p>Minimum:${props.minimumPrice}</p>
                <p>Maximum:${props.maximumPrice}</p>
            </div>
        </div>
    </div>);
}