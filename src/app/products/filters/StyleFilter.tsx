
interface Props {
    styles : string[]
}

function StyleFilter(props : Props) {
    return (<div>
        <div>
            
        </div>
        <div>
            {props.styles.map((item) => (<label>
                <input type='checkbox'/>
                {item}
            </label>))}
        </div>
    </div>);
}

export default StyleFilter;