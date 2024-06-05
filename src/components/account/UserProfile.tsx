import { ChangeEvent } from "react";
import { CartData } from "../lib/store/useCartStore";
import FormInputField from "./FormInputField";
import { useUser } from "@clerk/nextjs";
import styles from "./UserProfile.module.css";
import Link from "next/link";


function UserProfile() {

    const { isLoaded, isSignedIn, user } = useUser();
    if (!isLoaded || !isSignedIn) {
      return null
    }
  
    console.log(user)  

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {

    }

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {

    }

    const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {

    }

    const handleAddressRegionChange = (e: ChangeEvent<HTMLInputElement>) => {

    }

    return (<div className={styles.container}>
        <div className={styles.buttonsContainer}>
            <div>
                <Link href='/'>Homepage</Link>
            </div>
            <div>
                <div>
                    <p>Profile</p>
                </div>
                <div>
                    <p>Orders</p>
                </div>
            </div>
        </div>
        <div className={styles.contentSection}>
            <div>
                <div className={styles.contentHeaderSection}>
                    <p>Edit Profile</p>
                    <div>
                    <img src={user.imageUrl}/>
                    </div>
                </div>
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