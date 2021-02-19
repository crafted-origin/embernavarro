import Head from 'next/head';

import { HOME_OG_IMAGE_URL } from '@/lib/constants';

export default function Meta() {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.svg"
      />
      <link
        rel="icon"
        type="image/svg"
        sizes="32x32"
        href="/favicon/favicon-32x32.svg"
      />
      <link
        rel="icon"
        type="image/svg"
        sizes="16x16"
        href="/favicon/favicon-16x16.svg"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#000000"
      />
      <link rel="shortcut icon" href="/favicon/favicon.svg" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <meta name="description" content={`Ember Navarro's UI UX portfolio`} />
      <meta property="og:image" content={HOME_OG_IMAGE_URL} />
    </Head>
  );
}
