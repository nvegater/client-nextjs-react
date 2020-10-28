import {ThemeProvider, CSSReset, ColorModeProvider} from '@chakra-ui/core';
import {createClient, dedupExchange, fetchExchange, Provider} from 'urql';
import {AppProps} from "next/app";
import {cacheExchange, Cache, QueryInput, UpdateResolver} from '@urql/exchange-graphcache';
import {LoginMutation, MeDocument, MeQuery, RegisterMutation} from "../generated/graphql";
import theme from '../theme';
import {CacheExchangeOpts} from "@urql/exchange-graphcache/dist/types/cacheExchange";

function typedResolver<Result, Query>(
    cache: Cache,
    queryInput: QueryInput,
    result: any,
    update: (result: Result, query: Query) => Query) {
    return cache.updateQuery(queryInput, data => update(result, data as any) as any)
}

const updateLoginCache:(result: LoginMutation, query: MeQuery) => MeQuery = (result, query) => {
    return result.login.errors
        ? query
        : { //insert result of login on cache.
            me: result.login.user
        }
};

const updateRegisterCache:(result: RegisterMutation, query: MeQuery) => MeQuery = (result, query) => {
    return result.register.errors
        ? query
        : { //insert result of login on cache.
            me: result.register.user
        }
};

const loginCacheResolver: UpdateResolver = (result, args, cache, _info) => {
    //Wrapper to get Types
    typedResolver<LoginMutation, MeQuery>(
        cache,
        {query: MeDocument},
        result,
        updateLoginCache
    )
};

const registerCacheResolver: UpdateResolver = (result, args, cache, _info) => {
    //Wrapper to get Types
    typedResolver<RegisterMutation, MeQuery>(
        cache,
        {query: MeDocument},
        result,
        updateRegisterCache
    )
};

const cacheLoginMutation: CacheExchangeOpts = {
    updates: {
        Mutation: {
            login: loginCacheResolver,
            register: registerCacheResolver
        }
    }
};

const client = createClient({
    url: 'http://localhost:4000/graphql',
    fetchOptions: {
        credentials: "include"
    },
    exchanges: [dedupExchange, cacheExchange(cacheLoginMutation), fetchExchange],
});


function MyApp({Component, pageProps}: AppProps) {
    return (
        <Provider value={client}>
            <ThemeProvider theme={theme}>
                <ColorModeProvider>
                    <CSSReset/>
                    <Component {...pageProps} />
                </ColorModeProvider>
            </ThemeProvider>
        </Provider>
    )
}

export default MyApp
