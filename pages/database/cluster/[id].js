import Head from "next/head";
import Layout from "../../../components/layouts/Layout";
import { useRouter } from "next/router";
import api from "../../../utils/api";
import { ConnectivitySecurity, MaintenanceBackup, Configuration, Events } from "../../../components/interface/DatabaseClusterTabs";
import { Section, SectionHeader, SectionBody } from "../../../components/bootstrap/Section";
import { Breadcrumb, BreadcrumbItem } from "../../../components/bootstrap/SectionBreadcrumb";
import { Card, Row, Col, Tabs, Tab } from "react-bootstrap";
import useSWR from "swr";

const fetcher = url => api.get(url).then(res => res.data.data)

const ShowDatabaseClusterPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const { data, error } = useSWR(id ? `/database-clusters/${id}` : null, fetcher);

    return (
        <>
            <Head>
                <title>Detail DB Cluster  &mdash; PgBooster</title>
            </Head>
            <Layout>
                <Section>
                    <SectionHeader title="Database Cluster">
                        <Breadcrumb>
                            <BreadcrumbItem href="/dashboard" text="Home" />
                            <BreadcrumbItem text="Database Engine" />
                            <BreadcrumbItem href="/database" text="DB Clusters" />
                            <BreadcrumbItem text={id} />
                        </Breadcrumb>
                    </SectionHeader>
                    <SectionBody>
                        <Row>
                            <Col sm={6} md={12} lg={12}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Detail Database Cluster</Card.Title>
                                        <Tabs defaultActiveKey="configuration" id="db-info" className="nav-tabs-bordered d-flex">
                                            <Tab eventKey="configuration" title="Configuration">
                                                <Configuration data={data} />
                                            </Tab>
                                            <Tab eventKey="connectivity&security" title="Connectivity & Security">
                                                <ConnectivitySecurity data={data} />
                                            </Tab>
                                            <Tab eventKey="maintenance&backup" title="Maintenance & Backup">
                                                <MaintenanceBackup data={data} />
                                            </Tab>
                                            <Tab eventKey="events" title="Events">
                                                <Events />
                                            </Tab>
                                        </Tabs>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </SectionBody>
                </Section>
            </Layout>
        </>
    );
}

export default ShowDatabaseClusterPage;