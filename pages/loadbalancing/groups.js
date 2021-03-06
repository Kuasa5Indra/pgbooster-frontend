import Head from 'next/head';
import Layout from '../../components/layouts/Layout';
import api from '../../utils/api';
import { Section, SectionHeader, SectionBody } from "../../components/bootstrap/Section";
import { Breadcrumb, BreadcrumbItem } from "../../components/bootstrap/SectionBreadcrumb";
import { Card, Table, Row, Col, Spinner } from "react-bootstrap";
import { EmptyState } from "../../components/interface";
import useSWR from "swr";

const fetcher = url => api.get(url).then(res => res.data.data)

const TargetGroupsPage = () => {
    const { data, error } = useSWR('/loadbalancing/groups', fetcher);
    const targets = data;

    return (
        <>
            <Head>
                <title>Target Groups  &mdash; PgBooster</title>
            </Head>
            <Layout>
                <Section>
                    <SectionHeader title="Target Groups">
                        <Breadcrumb>
                            <BreadcrumbItem href="/dashboard" text="Home" />
                            <BreadcrumbItem text="Computing" />
                            <BreadcrumbItem text="Load Balancing" />
                            <BreadcrumbItem text="Target Groups" active />
                        </Breadcrumb>
                    </SectionHeader>
                    <SectionBody>
                        <Row>
                            <Col sm={6} md={12} lg={12}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Target Groups</Card.Title>
                                        {!targets ? (
                                            <div className="text-center">
                                                <br />
                                                <Spinner animation="border" variant="primary" />
                                            </div>
                                        ) : (targets.length > 0 ? (
                                            <Table responsive="lg" bordered>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Protocol</th>
                                                        <th scope="col">Port</th>
                                                        <th scope="col">IP Address Type</th>
                                                        <th scope="col">Target Type</th>
                                                        <th scope="col">VPC ID</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {targets.map((data) => {
                                                        return (
                                                            <tr key={data.TargetGroupArn}>
                                                                <th scope="row">{data.TargetGroupName}</th>
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
                                        ))}
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

export default TargetGroupsPage;