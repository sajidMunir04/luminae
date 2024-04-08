interface Props{
    categories : string[]
}


function InventoryManagementApp(props : Props)
{
    return (<div>
        <ul>
            {props.categories.map((item) => 
            <li>{item}</li>)}
        </ul>
    </div>);
}

export default InventoryManagementApp;