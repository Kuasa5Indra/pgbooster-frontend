import Head from "next/head";
import Layout from "../../components/layouts/Layout";
import api from "../../utils/api";
import { Section, SectionHeader, SectionBody } from "../../components/bootstrap/Section";
import { BreadcrumbHeader, BreadcrumbItem } from "../../components/bootstrap/SectionBreadcrumb";
import { Card, Table, Row, Col } from "react-bootstrap";

const AutoScalingInstancesPage = ({ items }) => {
    return (
        <>
            <Head>
                <title>Autoscaling Instances &mdash; PgBooster</title>
            </Head>
            <Layout>
                <Section>
                    <SectionHeader title="Auto Scaling">
                        <BreadcrumbHeader>
                            <BreadcrumbItem href="/dashboard" text="Dashboard" active />
                            <BreadcrumbItem text="Autoscaling Instances" />
                        </BreadcrumbHeader>
                    </SectionHeader>
                    <SectionBody title="Autoscaling Instances" lead="This is the list of autoscaling instances">
                        <Row>
                            <Col sm={6} md={12} lg={12}>
                                <Card>
                                    <Card.Header><h4>Instances</h4></Card.Header>
                                    <Card.Body>
                                        <Table responsive="md" bordered>
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Type</th>
                                                    <th>Auto Scaling Group Name</th>
                                                    <th>Availability Zone</th>
                                                    <th>Lifecycle State</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {items.data.map((data) => {
                                                    return (
                                                        <tr key={data.InstanceId}>
                                                            <td>{data.InstanceId}</td>
                                                            <td>{data.InstanceType}</td>
                                                            <td>{data.AutoScalingGroupName}</td>
                                                            <td>{data.AvailabilityZone}</td>
                                                            <td>{data.LifecycleState}</td>
                                                            <td>{data.HealthStatus}</td>
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
    const res = await api.get('/autoscaling/instances')
    const items = await res.data

    if (!items) {
        return {
            notFound: true,
        }
    }

    return {
        props: { items },
        revalidate: 10,
    }
}

export default AutoScalingInstancesPage;