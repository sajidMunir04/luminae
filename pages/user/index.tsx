import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { NextRouter, useRouter } from "next/router";


function Index() {
    const [user,setUser] = useState();

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
    
    </>);
}

export default Index;