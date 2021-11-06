import Head from "next/head";
import Layout from "../components/layouts/Layout";

export default function dashboard() {
    return (
        <>
            <Head>
                <title>Dashboard &mdash; PgBooster</title>
            </Head>
            <Layout>
                <div className="main-content">
                    <section className="section">
                        <div className="section-header">
                            <h1>Dashboard</h1>
                        </div>

                        <div className="section-body">
                        </div>
                    </section>
                </div>
            </Layout>
        </>
    );
};