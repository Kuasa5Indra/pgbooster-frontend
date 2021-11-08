import Head from "next/head";
import Layout from "../components/layouts/Layout";
import { Hero } from "../components/interface";

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
                            <Hero 
                                className="hero bg-primary text-white"
                                title="Welcome Back, Admin" 
                                lead="A Dashboard always tell you our system performances." 
                            />
                        </div>
                    </section>
                </div>
            </Layout>
        </>
    );
};