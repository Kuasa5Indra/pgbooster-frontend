import Head from "next/head";
import Layout from "../components/layouts/Layout";
import Link from "next/link";

function infrastructure() {
    return (
        <>
            <Head>
                <title>Upload Code &mdash; PgBooster</title>
            </Head>
            <Layout>
                <div className="main-content">
                    <section className="section">
                        <div className="section-header">
                            <h1>Upload Code</h1>
                            <div className="section-header-breadcrumb">
                                <div className="breadcrumb-item active"><Link href="/dashboard"><a>Dashboard</a></Link></div>
                                <div className="breadcrumb-item">Upload Code</div>
                            </div>
                        </div>

                        <div className="section-body">
                        </div>
                    </section>
                </div>
            </Layout>
        </>
    );
}

export default infrastructure;