import Head from "next/head";

import Page from "../components/Page";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="hectorbennett.com" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="/fonts/Alice-Regular.woff"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/Catamaran-Black.woff"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/Droid-Sans-Mono.woff"
          as="font"
          crossOrigin=""
        />
      </Head>
      <Page />
    </>
  );
}
