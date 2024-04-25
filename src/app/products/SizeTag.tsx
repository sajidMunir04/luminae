
interface Props {
    tag: string
}

function SizeTag(props : Props) {
    return (<div>
        <p>{props.tag}</p>
    </div>);
}