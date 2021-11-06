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
                            <div className="hero bg-primary text-white">
                                <div className="hero-inner">
                                    <h2>Welcome Back, Admin</h2>
                                    <p className="lead">A Dashboard always tell you our system performances.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Layout>
        </>
    );
};