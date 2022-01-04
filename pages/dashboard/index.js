import Head from "next/head";
import Layout from "../../components/layouts/Layout";
import { Hero } from "../../components/interface";
import { Section, SectionHeader, SectionBody } from "../../components/bootstrap/Section";
import nookies from "nookies";
import useSWR from "swr";
import api from "../../utils/api";

const fetcher = url => api.get(url, {headers: { "Authorization": "Bearer " + nookies.get().token}}).then(res => res.data.data)

const DashboardPage = () => {
    const { data, error } = useSWR('/auth/user', fetcher);
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
                            title={!data ? "Welcome back" : "Welcome back, " + data.find(x => x.Name === 'name').Value}
                            lead="A Dashboard always tell you our system performances."
                        />
                    </SectionBody>
                </Section>
            </Layout>
        </>
    );
};

export default DashboardPage;