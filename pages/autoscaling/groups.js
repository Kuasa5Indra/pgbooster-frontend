import Head from "next/head";
import Link from 'next/link';
import Layout from "../../components/layouts/Layout";
import dateFormat from "dateformat";
import api from "../../utils/api";
import { Card, Table, Row, Col } from "react-bootstrap";

const AutoScalingGroupsPage = ({ items }) => {
    return (
        <>
            <Head>
                <title>Autoscaling Groups &mdash; PgBooster</title>
            </Head>
            <Layout>
                <div className="main-content">
                    <section className="section">
                        <div className="section-header">
                            <h1>Auto Scaling</h1>
                            <div className="section-header-breadcrumb">
                                <div className="breadcrumb-item active"><Link href="/dashboard"><a>Dashboard</a></Link></div>
                                <div className="breadcrumb-item">Autoscaling Groups</div>
                            </div>
                        </div>

                        <div className="section-body">
                            <h2 className="section-title">Autoscaling Groups</h2>
                            <p className="section-lead">
                                This is the list of autoscaling groups
                            </p>

                            <Row>
                                <Col sm={6} md={12} lg={12}>
                                    <Card>
                                        <Card.Header><h4>Groups</h4></Card.Header>
                                        <Card.Body>
                                            <Table responsive="md" bordered>
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Min Capacity</th>
                                                        <th>Desired Capacity</th>
                                                        <th>Max Capacity</th>
                                                        <th>Availability Zone</th>
                                                        <th>Created at</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {items.data.map((data) => {
                                                        return (
                                                            <tr key={data.AutoScalingGroupARN}>
                                                                <td>{data.AutoScalingGroupName}</td>
                                                                <td>{data.MinSize}</td>
                                                                <td>{data.DesiredCapacity}</td>
                                                                <td>{data.MaxSize}</td>
                                                                <td>{data.AvailabilityZones.toString()}</td>
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
    const res = await api.get('/autoscaling/groups')
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

export default AutoScalingGroupsPage;