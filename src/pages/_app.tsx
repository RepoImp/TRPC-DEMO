import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import "../common/Textfield/style.scss"
import "../styles/style.scss"
import "../common/loading/style.scss"
import { trpc } from "../common/Utils/trpc";

import Font from "../common/Font";

interface CustomAppProps extends AppProps {
  pageProps: {
    session?: Session;
  } & AppProps["pageProps"];
}

const CustomApp = ({ Component, pageProps }: CustomAppProps) => {
  return (
    <>
      <Font/>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
};

export default trpc.withTRPC(CustomApp);
