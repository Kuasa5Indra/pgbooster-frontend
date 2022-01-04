import Head from "next/head";
import Layout from "../../components/layouts/Layout";
import dateFormat from "dateformat";
import api from "../../utils/api";
import { Section, SectionHeader, SectionBody } from "../../components/bootstrap/Section";
import { BreadcrumbHeader, BreadcrumbItem } from "../../components/bootstrap/SectionBreadcrumb";
import { Card, Table, Row, Col } from "react-bootstrap";
import { EmptyState } from "../../components/interface";
import nookies from "nookies";

const AutoScalingGroupsPage = ({ items }) => {
    return (
        <>
            <Head>
                <title>Autoscaling Groups &mdash; PgBooster</title>
            </Head>
            <Layout>
                <Section>
                    <SectionHeader title="Auto Scaling">
                        <BreadcrumbHeader>
                            <BreadcrumbItem href="/dashboard" text="Dashboard" active />
                            <BreadcrumbItem text="Autoscaling Groups" />
                        </BreadcrumbHeader>
                    </SectionHeader>
                    <SectionBody title="Autoscaling Groups" lead="This is the list of autoscaling groups">
                        <Row>
                            <Col sm={6} md={12} lg={12}>
                                <Card>
                                    <Card.Header><h4>Groups</h4></Card.Header>
                                    <Card.Body>
                                        {items.data.length > 0 ? (
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
    const token = nookies.get(context).token;
    const res = await api.get('/autoscaling/groups',{headers: { "Authorization": "Bearer " + token}})
    const items = await res.data

    if (!items) {
        return {
            notFound: true,
        }
    }

    return {
        props: { items }
    }
}

export default AutoScalingGroupsPage;