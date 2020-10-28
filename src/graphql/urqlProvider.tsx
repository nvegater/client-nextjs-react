import React, {ReactNode} from "react";
import {createClient, dedupExchange, fetchExchange, Provider} from 'urql';
import {cacheExchange} from '@urql/exchange-graphcache';
import cacheUpdates from "../graphql/cache/resolvers";
import {Client} from "@urql/core/dist/types/client";

const client:Client = createClient({
    url: 'http://localhost:4000/graphql',
    fetchOptions: {
        credentials: "include"
    },
    exchanges: [dedupExchange, cacheExchange(cacheUpdates), fetchExchange],
});

interface UrqlProviderProps {
    children: ReactNode;
}

const UrqlProvider:React.FC<UrqlProviderProps> = ({children}) => {
    return (
        <Provider value={client}>
            {children}
        </Provider>
    )
}

export default UrqlProvider
