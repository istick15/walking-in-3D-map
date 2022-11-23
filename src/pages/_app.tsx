import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../styles/createEmotionCache";
import dynamic from "next/dynamic";
import "../styles/globals.css";
const ThemeContextProvider = dynamic(
  () => import("../context/theme").then((mod) => mod.ThemeContextProvider),
  { ssr: false }
);

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeContextProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeContextProvider>
    </CacheProvider>
  );
}
