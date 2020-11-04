import React from "react";
import {NextPage} from "next";

interface ChangePasswordProps {
    token:string;
}
export const ChangePassword:NextPage<ChangePasswordProps> = ({token}) => {

    return (<>
    <div>Token is {token}</div>
    </>);
}

ChangePassword.getInitialProps = ({query}) => {
    console.log("This is the URL /change-password/[whateverTokenIS]", query)
    console.log("Token received in the email: [whateverTokenIS]", query.token)
    return {
        token: query.token as string
    }
}

export default ChangePassword;