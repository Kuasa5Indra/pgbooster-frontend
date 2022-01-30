import Head from 'next/head';
import Link from 'next/link';

const Custom404 = () => {
    return (
        <>
            <Head>
                <title>404 &mdash; Not Found</title>
            </Head>
            <main>
                <div className="container">

                    <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
                        <h1>404</h1>
                        <h2>The page you are looking for does not exist.</h2>
                        <Link href="/"><a className="btn">Back to home</a></Link>
                    </section>

                </div>
            </main>
        </>
    );
}

export default Custom404;