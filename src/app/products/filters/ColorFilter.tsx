
interface Props {
    colors: string[]
}

function ColorFilter(props : Props) {
    return (<div>

        <div>
        {props.colors.map((item) => (<div style={{backgroundColor: `${item}`}}>
        </div>))}
        </div>
    </div>);
}