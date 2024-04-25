interface Props {
    modelDetails : ModelDetail[]
}

interface ModelDetail  {
    type: string,
    quantity: number
}

function ModelFilter(props : Props) {
    return (<div>
        <div>
            <p>MODEL</p>
        </div>
        <div>
            {props.modelDetails.map((item) => (<div></div>))};
        </div>
    </div>);
}

export default ModelFilter;