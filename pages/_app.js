import Head from 'next/head'
// import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no" name="viewport" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
