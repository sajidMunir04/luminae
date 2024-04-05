
function FormInputField(props)
{
    return (<label>{props.fieldName}{props.isRequired && <span>*</span>}
        <input type={props.inputType} placeholder={props.placeholder}/>
    </label>)
}

export default FormInputField;