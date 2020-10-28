import {ColorModeProvider, CSSReset, ThemeProvider} from '@chakra-ui/core';
import {AppProps} from "next/app";
import theme from '../theme';
import UrqlProvider from "../graphql/urqlProvider";


function MyApp({Component, pageProps}: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <ColorModeProvider>
                <CSSReset/>
                <UrqlProvider>
                    <Component {...pageProps} />
                </UrqlProvider>
            </ColorModeProvider>
        </ThemeProvider>
    )
}

export default MyApp
