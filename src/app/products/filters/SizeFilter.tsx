
interface Props {
    sizes: string[]
}

function SizeFilter(props : Props) {
    return (<div>

        <div>
            {props.sizes.map((item) => (<SizeTag tag={item} colors={[]}/>))}
        </div>
    </div>);
}

export default SizeFilter;