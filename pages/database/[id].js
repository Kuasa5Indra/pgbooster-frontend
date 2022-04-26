import Head from "next/head";
import Layout from "../../components/layouts/Layout";
import dateFormat from "dateformat";
import { useRouter } from "next/router";
import api from "../../utils/api";
import { Section, SectionHeader, SectionBody } from "../../components/bootstrap/Section";
import { Breadcrumb, BreadcrumbItem } from "../../components/bootstrap/SectionBreadcrumb";
import { ConnectivitySecurity, MaintenanceBackup, Configuration, Events } from "../../components/interface/DatabaseTabs";
import { Card, Table, Row, Col, Tabs, Tab } from "react-bootstrap";
import nookies from "nookies";
import useSWR from "swr";

const fetcher = url => api.get(url, {headers: { "Authorization": "Bearer " + nookies.get().token}}).then(res => res.data.data)

const ShowDatabaseInstancePage = () => {
    const router = useRouter();
    const { id } = router.query;
    const token = nookies.get().token;
    const { data, error } = useSWR(id ? `/databases/${id}` : null, fetcher);

    return (
        <>
            <Head>
                <title>Detail DB Instance  &mdash; PgBooster</title>
            </Head>
            <Layout>
                <Section>
                    <SectionHeader title="Database Engine">
                        <Breadcrumb>
                            <BreadcrumbItem href="/dashboard" text="Home" />
                            <BreadcrumbItem text="Database Engine" />
                            <BreadcrumbItem href="/database" text="DB Instances" />
                            <BreadcrumbItem text={id} />
                        </Breadcrumb>
                    </SectionHeader>
                    <SectionBody>
                        <Row>
                            <Col sm={6} md={12} lg={12}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Detail Database Instance</Card.Title>
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
};

export default ShowDatabaseInstancePage;
