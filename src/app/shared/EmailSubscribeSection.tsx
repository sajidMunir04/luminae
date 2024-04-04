import styles from './EmailSubscribeSection.module.css';


function EmailSubscribeSection()
{
    return (<div>
            <div className={styles.form}>
                <h2>Luminae Store</h2>
                <p>Register your email not to miss the last minutes off+ Free delivery</p>
                <form>
                    <input type="email"/>
                    <button><img src='/Vector 42 (Stroke).png'/></button>
                </form>
            </div>
            <div className={styles.formBackBackground}>
                <div className={styles.emailBackground}>
                
                </div>
            </div>
    </div>);
}

export default EmailSubscribeSection;