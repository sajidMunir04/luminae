
function UserAccountForm(props)
{
    return (<form><p>{props.formName}</p>
        <label>Name
        <input type="text" placeholder="Full Name"/>
        </label>
        <label>Email
        <input type="email" placeholder="Email Address"/>
        </label>        
        <label>Password
        <input type="password" placeholder="Password"/>
        </label>
        <label>
            <input type='checkbox'/>
            {props.checkBoxText}
        </label>
    </form>);
}

export default UserAccountForm;