import Head from "next/head";
import Layout from "../../components/layouts/Layout";
import dateFormat from "dateformat";
import api from "../../utils/api";
import { Section, SectionHeader, SectionBody } from "../../components/bootstrap/Section";
import { Breadcrumb, BreadcrumbItem } from "../../components/bootstrap/SectionBreadcrumb";
import { Card, Table, Row, Col, Spinner } from "react-bootstrap";
import { EmptyState } from "../../components/interface";
import useSWR from "swr";

const fetcher = url => api.get(url).then(res => res.data.data)

const AutoScalingGroupsPage = () => {
    const { data, error } = useSWR('/autoscaling/groups', fetcher);
    const items = data;

    return (
        <>
            <Head>
                <title>Autoscaling Groups &mdash; PgBooster</title>
            </Head>
            <Layout>
                <Section>
                    <SectionHeader title="Autoscaling Groups">
                        <Breadcrumb>
                            <BreadcrumbItem href="/dashboard" text="Home" />
                            <BreadcrumbItem text="Computing" />
                            <BreadcrumbItem text="Auto Scaling" />
                            <BreadcrumbItem text="Groups" active />
                        </Breadcrumb>
                    </SectionHeader>
                    <SectionBody>
                        <Row>
                            <Col sm={6} md={12} lg={12}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Autoscaling Groups</Card.Title>
                                        {!items ? (
                                            <div className="text-center">
                                                <br />
                                                <Spinner animation="border" variant="primary" />
                                            </div>
                                        ) : (items.length > 0 ? (
                                            <Table responsive="lg" bordered>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Min Capacity</th>
                                                        <th scope="col">Desired Capacity</th>
                                                        <th scope="col">Max Capacity</th>
                                                        <th scope="col">Availability Zone</th>
                                                        <th scope="col">Created at</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {items.map((data) => {
                                                        return (
                                                            <tr key={data.AutoScalingGroupARN}>
                                                                <th scope="row">{data.AutoScalingGroupName}</th>
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

// export async function getServerSideProps(context) {
//     const token = nookies.get(context).token;
//     const res = await api.get('/autoscaling/groups',{headers: { "Authorization": "Bearer " + token}})
//     const items = await res.data

//     if (!items) {
//         return {
//             notFound: true,
//         }
//     }

//     return {
//         props: { items }
//     }
// }

export default AutoScalingGroupsPage;