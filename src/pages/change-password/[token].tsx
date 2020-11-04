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