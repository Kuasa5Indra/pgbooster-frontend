import Head from "next/head";
import Layout from "../../components/layouts/Layout";
import { Section, SectionHeader, SectionBody } from "../../components/bootstrap/Section";
import { Breadcrumb, BreadcrumbItem } from "../../components/bootstrap/SectionBreadcrumb";
import { AWSCredentialsAlert, DatabaseMetrics } from "../../components/interface";
import { Row, Col, Card } from "react-bootstrap";
import useSWR from "swr";
import api from "../../utils/api";

const fetcher = url => api.get(url).then(res => res.data)

const DashboardPage = () => {
    const { data } = useSWR('/auth/user/credentials', fetcher);

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
                        <AWSCredentialsAlert data={data} />
                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Dashboard Metrics</Card.Title>
                                        <Card.Subtitle>These are database metrics shown on dashboard</Card.Subtitle>
                                        <br />
                                        {data?.data.alert === 'success' && (
                                            <DatabaseMetrics />
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </SectionBody>
                </Section>
            </Layout>
        </>
    );
};

export default DashboardPage;
