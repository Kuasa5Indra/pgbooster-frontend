import Head from 'next/head';
import Layout from '../../components/layouts/Layout';
import Link from 'next/link';
import api from '../../utils/api';
import dateFormat from "dateformat";
import { Card, Table, Row, Col } from "react-bootstrap";

const index = ({ loadbalancer }) => {
    return (
        <>
            <Head>
                <title>Load Balancing &mdash; PgBooster</title>
            </Head>
            <Layout>
                <div className="main-content">
                    <section className="section">
                        <div className="section-header">
                            <h1>Load Balancing</h1>
                            <div className="section-header-breadcrumb">
                                <div className="breadcrumb-item active"><Link href="/dashboard"><a>Dashboard</a></Link></div>
                                <div className="breadcrumb-item">Load Balancers</div>
                            </div>
                        </div>

                        <div className="section-body">
                            <h2 className="section-title">Load Balancers</h2>
                            <p className="section-lead">
                                This is the list of load balancers
                            </p>

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
                        </div>
                    </section>
                </div>
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

export default index;