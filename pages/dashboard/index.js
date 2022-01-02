import Head from "next/head";
import Layout from "../../components/layouts/Layout";
import { Hero } from "../../components/interface";
import { Section, SectionHeader, SectionBody } from "../../components/bootstrap/Section";

const DashboardPage = () => {
    return (
        <>
            <Head>
                <title>Dashboard &mdash; PgBooster</title>
            </Head>
            <Layout>
                <Section>
                    <SectionHeader title="Dashboard" />
                    <SectionBody>
                        <Hero
                            className="hero bg-primary text-white"
                            title="Welcome Back, Admin"
                            lead="A Dashboard always tell you our system performances."
                        />
                    </SectionBody>
                </Section>
            </Layout>
        </>
    );
};

export default DashboardPage;