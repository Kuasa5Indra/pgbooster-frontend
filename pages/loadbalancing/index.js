import Head from 'next/head';
import Layout from '../../components/layouts/Layout';
import api from '../../utils/api';
import dateFormat from "dateformat";
import { Section, SectionHeader, SectionBody } from "../../components/bootstrap/Section";
import { Breadcrumb, BreadcrumbItem } from "../../components/bootstrap/SectionBreadcrumb";
import { Card, Table, Row, Col, Spinner } from "react-bootstrap";
import { EmptyState } from "../../components/interface";
import nookies from "nookies";
import useSWR from "swr";

const fetcher = url => api.get(url, { headers: { "Authorization": "Bearer " + nookies.get().token } }).then(res => res.data.data)

const LoadBalancerPage = () => {
    const { data, error } = useSWR('/loadbalancing', fetcher);
    const loadbalancer = data;

    return (
        <>
            <Head>
                <title>Load Balancers  &mdash; PgBooster</title>
            </Head>
            <Layout>
                <Section>
                    <SectionHeader title="Load Balancers">
                        <Breadcrumb>
                            <BreadcrumbItem href="/dashboard" text="Home" />
                            <BreadcrumbItem text="Computing" />
                            <BreadcrumbItem text="Load Balancing" />
                            <BreadcrumbItem text="Load Balancers" active />
                        </Breadcrumb>
                    </SectionHeader>
                    <SectionBody>
                        <Row>
                            <Col sm={6} md={12} lg={12}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Load Balancers</Card.Title>
                                        {!loadbalancer ? (
                                            <div className="text-center">
                                                <br />
                                                <Spinner animation="border" variant="primary" />
                                            </div>
                                        ) : (loadbalancer.length > 0 ? (
                                            <Table responsive="lg" bordered>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">DNS Name</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col">Type</th>
                                                        <th scope="col">VPC ID</th>
                                                        <th scope="col">Availability Zones</th>
                                                        <th scope="col">Created at</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {loadbalancer.map((data) => {
                                                        return (
                                                            <tr key={data.LoadBalancerArn}>
                                                                <th scope="row">{data.LoadBalancerName}</th>
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

export default LoadBalancerPage;