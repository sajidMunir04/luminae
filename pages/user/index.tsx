import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { NextRouter, useRouter } from "next/router";
import HeaderTemplate from "@/app/shared/HeaderTemplate";
import FooterTemplate from "@/app/shared/FooterTemplate";
import UserProfile from "@/app/account/UserProfile";
import { UserProfileData } from "@/app/lib/definitions";


function Index() {
    const [user,setUser] = useState<UserProfileData>();

    const changeUserData = async() => {
        
    }
    
    useEffect(() => {
        const userId : string[] = [];
        const fetchData = async() => {
            try {
                const response = await fetch('api/fetchUser',{
                    method : "POST",
                    body: ''
                });
                const data = await response.json();
                console.log(data);
            }
            catch (error) {
                console.log(error);
            }
        }

        fetchData();

    },[])

    return (<>
        <HeaderTemplate/>
        <UserProfile/>
        <FooterTemplate/>
    </>);
}

export default Index;