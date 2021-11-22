import Head from "next/head";
import Link from 'next/link';
import Layout from "../../components/layouts/Layout";
import api from "../../utils/api";
import { Card, Table, Row, Col } from "react-bootstrap";

const instances = ({ items }) => {
    return (
        <>
            <Head>
                <title>Autoscaling Instances &mdash; PgBooster</title>
            </Head>
            <Layout>
                <div className="main-content">
                    <section className="section">
                        <div className="section-header">
                            <h1>Auto Scaling</h1>
                            <div className="section-header-breadcrumb">
                                <div className="breadcrumb-item active"><Link href="/dashboard"><a>Dashboard</a></Link></div>
                                <div className="breadcrumb-item">Autoscaling Instances</div>
                            </div>
                        </div>

                        <div className="section-body">
                            <h2 className="section-title">Autoscaling Instances</h2>
                            <p className="section-lead">
                                This is the list of running autoscaling instances
                            </p>
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
                        </div>
                    </section>
                </div>
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

export default instances;