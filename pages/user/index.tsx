import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { NextRouter, useRouter } from "next/router";
import HeaderTemplate from "@/app/shared/HeaderTemplate";
import FooterTemplate from "@/app/shared/FooterTemplate";
import UserProfile from "@/app/account/UserProfile";
import { UserProfileData } from "@/app/lib/definitions";

function Index() {
    return (<>
        <UserProfile/>
    </>);
}

export default Index;