import {ColorModeProvider, CSSReset, ThemeProvider} from '@chakra-ui/core';
import {createClient, dedupExchange, fetchExchange, Provider} from 'urql';
import {AppProps} from "next/app";
import {cacheExchange} from '@urql/exchange-graphcache';
import theme from '../theme';
import cacheUpdates from "../graphql/cache/resolvers";

const client = createClient({
    url: 'http://localhost:4000/graphql',
    fetchOptions: {
        credentials: "include"
    },
    exchanges: [dedupExchange, cacheExchange(cacheUpdates), fetchExchange],
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
