import PageWrapper from "@/components/common/PageWrapper";
import { AppProps } from "next/app";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
      <>
        <header />
        <PageWrapper>{children}</PageWrapper>
        <footer />
      </>
    );
}

export default function App({ Component, pageProps }: AppProps) {
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
}