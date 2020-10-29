import React from "react";
import {dedupExchange, Exchange, fetchExchange} from 'urql';
import {cacheExchange} from '@urql/exchange-graphcache';
import cacheUpdates from "../graphql/cache/resolvers";
import {SSRExchange} from "next-urql/dist/types/types";

export const createUrqlClient = (ssrExchange: SSRExchange) => {
    const castedExchanges: Exchange[] = [ //Needed because [Exchange, Exchange] not the Same as Exchange[].. duh
        dedupExchange,
        cacheExchange(cacheUpdates),
        ssrExchange, fetchExchange]
    ;
    return ({
        url: 'http://localhost:4000/graphql',
        fetchOptions: {
            credentials: "include" as const
        },
        exchanges: castedExchanges,
    }) as const
};
