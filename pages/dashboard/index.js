import Head from "next/head";
import Layout from "../../components/layouts/Layout";
import { Section, SectionHeader, SectionBody } from "../../components/bootstrap/Section";
import { Breadcrumb, BreadcrumbItem } from "../../components/bootstrap/SectionBreadcrumb";
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
                    <SectionHeader title="Dashboard">
                        <Breadcrumb>
                            <BreadcrumbItem href="/dashboard" text="Home" />
                            <BreadcrumbItem text="Dashboard" active />
                        </Breadcrumb>
                    </SectionHeader>
                    <SectionBody>
                        <div className="row">
                            <div className="col-lg-6">

                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Example Card</h5>
                                        <p>This is an examle page with no contrnt. You can use it as a starter for your custom pages.</p>
                                    </div>
                                </div>

                            </div>

                            <div className="col-lg-6">

                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Example Card</h5>
                                        <p>This is an examle page with no contrnt. You can use it as a starter for your custom pages.</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </SectionBody>
                </Section>
            </Layout>
        </>
    );
};

export default DashboardPage;