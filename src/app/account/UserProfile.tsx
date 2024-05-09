import { ChangeEvent } from "react";
import { CartData } from "../lib/store/useCartStore";
import FormInputField from "./FormInputField";

function UserProfile() {
    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {

    }

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {

    }

    const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {

    }

    const handleAddressRegionChange = (e: ChangeEvent<HTMLInputElement>) => {

    }

    return (<div>
        <div>
            <div>
                <p>Profile</p>
            </div>
            <div>
                <p>Orders</p>
            </div>
        </div>
        <div>
            <div>
                <form>
                    <div>
                        <FormInputField fieldName={"Name"} type={"text"} placeholder={""} handleChange={handleNameChange}/>  
                    </div>
                    <div>
                        <FormInputField fieldName={"Email"} type={"email"} placeholder={""} handleChange={handleEmailChange}/>
                    </div>
                    <div>
                        <FormInputField fieldName={"Address"} type={"text"} placeholder={""} handleChange={handleAddressChange}/>
                    </div>
                    <div>
                        <FormInputField fieldName={"Region"} type={""} placeholder={""} handleChange={handleAddressRegionChange}/>
                    </div>
                </form>
            </div>
            <div>
                
            </div>
        </div>
    </div>);
}

export default UserProfile;