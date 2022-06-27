import Head from "next/head";
import Layout from "../../components/layouts/Layout";
import { Section, SectionHeader, SectionBody } from "../../components/bootstrap/Section";
import { Breadcrumb, BreadcrumbItem } from "../../components/bootstrap/SectionBreadcrumb";
import { AWSCredentialsAlert } from "../../components/interface";
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
                                        <div className="embed-responsive embed-responsive-16by9">
                                            <iframe className="embed-responsive-item"
                                                    src={process.env.NEXT_PUBLIC_CLOUDWATCH_DASHBOARD}
                                                    allowFullScreen
                                                    width="100%"
                                                    height={1000}
                                            >
                                            </iframe>
                                        </div>
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
