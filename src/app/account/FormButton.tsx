import styes from './FormButton.module.css';

function FormButton(props)
{
    return (<button className={styes.container} type='submit'>{props.text}
    </button>);
}

export default FormButton;