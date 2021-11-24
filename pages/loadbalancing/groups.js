import Head from 'next/head';
import Layout from '../../components/layouts/Layout';
import api from '../../utils/api';
import { Section, SectionHeader, SectionBody } from "../../components/bootstrap/Section";
import { BreadcrumbHeader, BreadcrumbItem } from "../../components/bootstrap/SectionBreadcrumb";
import { Card, Table, Row, Col } from "react-bootstrap";
import { EmptyState } from "../../components/interface";

const TargetGroupsPage = ({ targets }) => {
    return (
        <>
            <Head>
                <title>Target Groups &mdash; PgBooster</title>
            </Head>
            <Layout>
                <Section>
                    <SectionHeader title="Load Balancing">
                        <BreadcrumbHeader>
                            <BreadcrumbItem href="/dashboard" text="Dashboard" active />
                            <BreadcrumbItem text="Target Groups" />
                        </BreadcrumbHeader>
                    </SectionHeader>
                    <SectionBody title="Target Groups" lead="This is the list of target groups">
                        <Row>
                            <Col sm={6} md={12} lg={12}>
                                <Card>
                                    <Card.Header><h4>Target Groups</h4></Card.Header>
                                    <Card.Body>
                                        {targets.data.length > 0 ? (
                                            <Table responsive="md" bordered>
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Protocol</th>
                                                        <th>Port</th>
                                                        <th>IP Address Type</th>
                                                        <th>Target Type</th>
                                                        <th>VPC ID</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {targets.data.map((data) => {
                                                        return (
                                                            <tr key={data.TargetGroupArn}>
                                                                <td>{data.TargetGroupName}</td>
                                                                <td>{data.Protocol}</td>
                                                                <td>{data.Port}</td>
                                                                <td>{data.IpAddressType}</td>
                                                                <td>{data.TargetType}</td>
                                                                <td>{data.VpcId}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </Table>
                                        ) : (
                                            <EmptyState />
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
}

export async function getServerSideProps(context) {
    const res = await api.get('/loadbalancing/groups');
    const targets = await res.data;

    if (!targets) {
        return {
            notFound: true
        };
    }

    return {
        props: { targets }
    };
}

export default TargetGroupsPage;