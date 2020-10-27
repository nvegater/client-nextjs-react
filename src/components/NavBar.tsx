import React from "react";
import NextLink from "next/link"
import {Button, Link} from "@chakra-ui/core";
import FormResponsiveContainer from "./FormResponsiveContainer";
import {useMeQuery} from "../generated/graphql";

const NavBar: React.FC = () => {
    const [{data, fetching}] = useMeQuery()
    const me = data?.me;

    return (
        <FormResponsiveContainer>
        {
            fetching && <h1>Loading</h1>
        }
        {
            !fetching && !me && <>
                <NextLink href="/login">
                    <Link m={7}>Login</Link>
                </NextLink>
                <NextLink href="/register">
                    <Link m={7}>Register</Link>
                </NextLink>
            </>
        }
        {
            me && <>
                <h1>Welcome {me.username}</h1>
                <Button type="submit" m={5}>Logout</Button>
            </>
        }

    </FormResponsiveContainer>)
}

export default NavBar;