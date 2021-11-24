import Head from 'next/head';
import Link from 'next/link';

const Custom500 = () => {
    return (
        <>
            <Head>
                <title>500 - Internal Server Error</title>
            </Head>
            <section className="section">
                <div className="container mt-5">
                    <div className="page-error">
                        <div className="page-inner">
                            <h1>500</h1>
                            <div className="page-description">
                                Whoopps, something went wrong.
                            </div>
                            <div className="page-search">
                                <div className="mt-3">
                                    <Link href="/">
                                        <a>Back to Home</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="simple-footer mt-5">
                        Copyright &copy; PgBooster 2021
                    </div>
                </div>
            </section>
        </>
    );
}

export default Custom500;