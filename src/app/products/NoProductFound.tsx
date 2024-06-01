
interface Props {
    searchTerm : string
}


function NoProductFound(props : Props) {
    return (<div>
        <div>
            <img src="/images/product/notfound.png"/>
        </div>
        <div>
            <p>No results were found for searching {props.searchTerm}.</p>
            <div>
                <div>
                    <img src="/images/product/error.svg"/>
                </div>
                <p>We recommend you to search different clear key words to get the best result.</p>
            </div>
            <div>
                <div>
                    <img src="/images/product/error.svg"/>
                </div>
                <p>We recommend you to search different clear key words to get the best result.</p>
            </div>
        </div>
    </div>);
}

export default NoProductFound;