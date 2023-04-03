import NextHead from "next/head";

interface HeadProps {
  title: string;
}

export default function Head({ title = "Hector Bennett | Web Developer" }: HeadProps) {
  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content="hectorbennett.com" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest?v=1" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg?v=1" color="#5bbad5" />
      <link rel="shortcut icon" href="/favicon.ico?v=1" />
      <meta name="msapplication-TileColor" content="#603cba" />
      <meta name="theme-color" content="#ffffff" />
      <link rel="preload" href="/fonts/Alice-Regular.woff" as="font" crossOrigin="" />
      <link rel="preload" href="/fonts/Droid-Sans-Mono.woff" as="font" crossOrigin="" />
    </NextHead>
  );
}
