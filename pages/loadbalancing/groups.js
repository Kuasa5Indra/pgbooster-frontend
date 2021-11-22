import Head from 'next/head';
import Layout from '../../components/layouts/Layout';
import Link from 'next/link';
import api from '../../utils/api';
import { Card, Table, Row, Col } from "react-bootstrap";

const TargetGroupsPage = ({ targets }) => {
    return (
        <>
            <Head>
                <title>Target Groups &mdash; PgBooster</title>
            </Head>
            <Layout>
                <div className="main-content">
                    <section className="section">
                        <div className="section-header">
                            <h1>Load Balancing</h1>
                            <div className="section-header-breadcrumb">
                                <div className="breadcrumb-item active"><Link href="/dashboard"><a>Dashboard</a></Link></div>
                                <div className="breadcrumb-item">Target Groups</div>
                            </div>
                        </div>

                        <div className="section-body">
                            <h2 className="section-title">Target Groups</h2>
                            <p className="section-lead">
                                This is the list of target groups
                            </p>

                            <Row>
                                <Col sm={6} md={12} lg={12}>
                                    <Card>
                                        <Card.Header><h4>Target Groups</h4></Card.Header>
                                        <Card.Body>
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
    const res = await api.get('/loadbalancing/groups');
    const targets = await res.data;

    if (!targets) {
        return {
            notFound: true
        };
    }

    return {
        props: { targets },
        revalidate: 10,
    };
}

export default TargetGroupsPage;