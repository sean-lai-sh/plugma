import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (

      <Component {...pageProps} />
  );
}

export default MyApp;
