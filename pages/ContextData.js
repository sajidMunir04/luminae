import ProductsManager from '../src/app/utils/ProductsContext';

function ContextData(WrappedComponent)
{
    return (props) => (<ProductsManager>
        <WrappedComponent {...props}/>
    </ProductsManager>)
}

export default ContextData;