import Head from 'next/head';
import Link from 'next/link';

const Custom500 = () => {
    return (
        <>
            <Head>
                <title>500 &mdash; Internal Server Error</title>
            </Head>
            <main>
                <div className="container">

                    <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
                        <h1>500</h1>
                        <h2>Something wrong on server</h2>
                        <Link href="/"><a className="btn">Back to home</a></Link>
                    </section>

                </div>
            </main>
        </>
    );
}

export default Custom500;