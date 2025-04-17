import Header from "@/components/layout/Header";
import Page from "@/components/layout/Page";
import { LocationProvider } from "@/contexts/LocationContext";
import GlobalStyle from "@/styles/GlobalStyle";
import { theme } from "@/styles/theme";
import { AppProps } from "next/app";
import { ThemeProvider } from 'styled-components'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <Page>{children}</Page>
        </>
    );
};

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <>
                <GlobalStyle />
                <Layout>
                    <LocationProvider>
                        <Component {...pageProps} />
                    </LocationProvider>
                </Layout>
            </>
        </ThemeProvider>
    );
};