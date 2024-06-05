
interface Props {
    headingText: string
}

function FilterHeading(props : Props) {
    return (<h4>
        {props.headingText}
    </h4>)
}

export default FilterHeading;