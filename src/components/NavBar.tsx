import React from "react";
import NextLink from "next/link"
import {Box, Button, Flex} from "@chakra-ui/core";
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
        <Flex justifyContent={me?.user ? "right" : "center"}
              position="sticky"
              top={0}
              zIndex={1}
              backgroundColor="black"
              height="60px"
        >
            {
                loadingMeQuery && <Box><h1>Loading</h1></Box>
            }
            {
                !loadingMeQuery && !me?.user && <Flex my="0.6rem">
                    <NextLink href="/login">
                        <Button mr={8}>Login</Button>
                    </NextLink>
                    <NextLink href="/register">
                        <Button ml={8}>Register</Button>
                    </NextLink>
                </Flex>
            }
            {
                me?.user && <Flex alignItems="center">
                    <h1>Welcome {me.user?.username}</h1>
                    <Button type="submit" onClick={handleLogout} mx="1rem" isLoading={loadingLogout}>Logout</Button>
                </Flex>
            }

        </Flex>
    )
}

export default NavBar;