import Head from 'next/head';
import Layout from '../../components/layouts/Layout';
import api from '../../utils/api';
import dateFormat from "dateformat";
import { Section, SectionHeader, SectionBody } from "../../components/bootstrap/Section";
import { BreadcrumbHeader, BreadcrumbItem } from "../../components/bootstrap/SectionBreadcrumb";
import { Card, Table, Row, Col } from "react-bootstrap";

const LoadBalancerPage = ({ loadbalancer }) => {
    return (
        <>
            <Head>
                <title>Load Balancing &mdash; PgBooster</title>
            </Head>
            <Layout>
                <Section>
                    <SectionHeader title="Load Balancing">
                        <BreadcrumbHeader>
                            <BreadcrumbItem href="/dashboard" text="Dashboard" active />
                            <BreadcrumbItem text="Load Balancers" />
                        </BreadcrumbHeader>
                    </SectionHeader>
                    <SectionBody title="Load Balancers" lead="This is the list of load balancers">
                        <Row>
                            <Col sm={6} md={12} lg={12}>
                                <Card>
                                    <Card.Header><h4>Load Balancers</h4></Card.Header>
                                    <Card.Body>
                                        <Table responsive="md" bordered>
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>DNS Name</th>
                                                    <th>Status</th>
                                                    <th>Type</th>
                                                    <th>VPC ID</th>
                                                    <th>Availability Zones</th>
                                                    <th>Created at</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {loadbalancer.data.map((data) => {
                                                    return (
                                                        <tr key={data.LoadBalancerArn}>
                                                            <td>{data.LoadBalancerName}</td>
                                                            <td>{data.DNSName}</td>
                                                            <td>{data.State.Code}</td>
                                                            <td>{data.Type}</td>
                                                            <td>{data.VpcId}</td>
                                                            <td>{data.AvailabilityZones.map(({ ZoneName }) => ZoneName).toString()}</td>
                                                            <td>{dateFormat(data.CreatedTime, "dd/mm/yyyy HH:MM:ss")}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </Table>
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

export async function getStaticProps(context) {
    const res = await api.get('/loadbalancing')
    const loadbalancer = await res.data

    if (!loadbalancer) {
        return {
            notFound: true,
        };
    }

    return {
        props: { loadbalancer },
        revalidate: 10
    };
}

export default LoadBalancerPage;