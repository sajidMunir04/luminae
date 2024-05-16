import { Roles } from "../types/globals";
import { auth, getAuth } from "@clerk/nextjs/server"

export const checkRole = (role: Roles, {sessionClaims}) => {
    return sessionClaims?.metadata.role === role;
}

export function getServerSideProps({ req }) {
    const { sessionClaims } = getAuth(req);
  
    return {
      props: {
        properties: { sessionClaims },
      },
    };
  }