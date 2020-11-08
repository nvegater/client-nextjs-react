import React from "react";
import NextLink from "next/link"
import {Box, Button, Flex, Link} from "@chakra-ui/core";
import {useLogoutMutation, useMeQuery} from "../generated/graphql";
import isServer from "../utils/isServer";

const NavBar: React.FC = () => {
    const [{data: meQuery, fetching: loadingMeQuery}] = useMeQuery({
        pause: isServer() // dont run request in server. Only in Client, because is done through browser cookies.
    })
    const me = meQuery?.me;

    const [{fetching: loadingLogout}, logout] = useLogoutMutation();

    const handleLogout = () => {
        logout();
    }

    return (
        <Flex justifyContent={me?.user ? "right" : "center"}>
            {
                loadingMeQuery && <Box><h1>Loading</h1></Box>
            }
            {
                !loadingMeQuery && !me?.user && <Flex>
                    <NextLink href="/login">
                        <Link m={8}><Button>Login</Button></Link>
                    </NextLink>
                    <NextLink href="/register">
                        <Link m={8}><Button>Register</Button></Link>
                    </NextLink>
                </Flex>
            }
            {
                me?.user && <Flex alignItems="center">
                    <h1>Welcome {me.user?.username}</h1>
                    <Button type="submit" m={5} onClick={handleLogout} isLoading={loadingLogout}>Logout</Button>
                </Flex>
            }

        </Flex>
    )
}

export default NavBar;