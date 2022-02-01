import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <title>METAMOOSE</title>
          <meta name="description" content="METAMOOSE CLUB" />
          <link rel="apple-touch-icon" href="/mooseIcon.png" />
          <meta name="twitter:title" content="METAMOOSE" />
          <meta
            name="twitter:card"
            content="https://pbs.twimg.com/profile_banners/1468821942585147393/1639029991/1500x500"
          />
          <meta name="twitter:site" content="@Meta_Moose_Club" />
          <meta name="twitter:creator" content="@Meta_Moose_Club" />
          <meta property="og:title" content="METAMOOSE" />
          <meta property="og:description" content="METAMOOSE COMING SOON" />
          <meta
            property="og:image"
            content="https://pbs.twimg.com/profile_banners/1468821942585147393/1639029991/1500x500"
          />
        </Head>
        <body>
          <Main />
          <div id="modal-root" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
