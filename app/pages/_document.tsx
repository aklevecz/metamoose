import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <title>The Meta Moose Club</title>
          <meta name="description" content="Meta Moose Club" />
          <link rel="apple-touch-icon" href="/mooseIcon.png" />
          <meta name="twitter:title" content="Meta Moose Club" />
          <meta
            name="twitter:card"
            content="https://pbs.twimg.com/profile_banners/1468821942585147393/1639029991/1500x500"
          />
          <meta name="twitter:site" content="@Meta_Moose_Club" />
          <meta name="twitter:creator" content="@Meta_Moose_Club" />
          <meta property="og:title" content="Meta Moose Club" />
          <meta
            property="og:description"
            content="The Meta Moose Club - COMING SOON"
          />
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
