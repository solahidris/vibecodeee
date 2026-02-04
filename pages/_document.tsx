import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Charset & Viewport (handled by Next.js but explicit for clarity) */}
        <meta charSet="utf-8" />

        {/* SEO Meta Tags */}
        <meta name="description" content="Join our exclusive premium community. Access expert resources, connect with like-minded individuals, and grow together." />
        <meta name="keywords" content="community, premium, resources, learning, networking, AI, prompting" />
        <meta name="author" content="VibeCodE Community" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="VibeCodeee - Premium Community Platform" />
        <meta property="og:description" content="Join our exclusive premium community. Access expert resources, connect with like-minded individuals, and grow together." />
        <meta property="og:site_name" content="VibeCodeee" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="VibeCodeee - Premium Community Platform" />
        <meta name="twitter:description" content="Join our exclusive premium community. Access expert resources, connect with like-minded individuals, and grow together." />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

        {/* Theme Color */}
        <meta name="theme-color" content="#ffffff" />

        {/* Robots */}
        <meta name="robots" content="index, follow" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
