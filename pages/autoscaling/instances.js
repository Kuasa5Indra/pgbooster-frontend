import Head from "next/head";
import Layout from "../../components/layouts/Layout";
import api from "../../utils/api";
import { useRouter } from "next/router";
import { Section, SectionHeader, SectionBody } from "../../components/bootstrap/Section";
import { Breadcrumb, BreadcrumbItem } from "../../components/bootstrap/SectionBreadcrumb";
import { Card, Table, Row, Col, Button } from "react-bootstrap";
import { EmptyState } from "../../components/interface";
import swal from "sweetalert";
import nookies from "nookies";

const AutoScalingInstancesPage = ({ items }) => {
    const router = useRouter();
    const token = nookies.get().token;
    
    const terminateInstance = (id) => {
        swal({
            title: "Are you sure ?",
            text: "Once its terminated, you will not able to restore your instance and will be created another one",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willTerminate) => {
                if (willTerminate) {
                    api.delete(`/autoscaling/instances/${id}`, {headers: { "Authorization": "Bearer " + token}})
                        .then((response) => {
                            swal({
                                title: response.data.status,
                                text: response.data.message,
                                icon: "success",
                            }).then(function () {
                                router.reload('/autoscaling/instances');
                            });
                        }).catch((error) => {
                            swal({
                                title: error.response.data.status,
                                text: error.response.data.message,
                                icon: "error",
                            })
                        })
                }
            });
    }

    return (
        <>
            <Head>
                <title>Autoscaling Instances &mdash; PgBooster</title>
            </Head>
            <Layout>
                <Section>
                    <SectionHeader title="Autoscaling Instances">
                        <Breadcrumb>
                            <BreadcrumbItem href="/dashboard" text="Home" />
                            <BreadcrumbItem text="Computing" />
                            <BreadcrumbItem text="Auto Scaling" />
                            <BreadcrumbItem text="Instances" active />
                        </Breadcrumb>
                    </SectionHeader>
                    <SectionBody>
                        <Row>
                            <Col sm={6} md={12} lg={12}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Autoscaling Instances</Card.Title>
                                        {items.data.length > 0 ? (
                                            <Table responsive="lg" bordered>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">ID</th>
                                                        <th scope="col">Type</th>
                                                        <th scope="col">Auto Scaling Group Name</th>
                                                        <th scope="col">Availability Zone</th>
                                                        <th scope="col">Lifecycle State</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {items.data.map((data) => {
                                                        return (
                                                            <tr key={data.InstanceId}>
                                                                <th scope="row">{data.InstanceId}</th>
                                                                <td>{data.InstanceType}</td>
                                                                <td>{data.AutoScalingGroupName}</td>
                                                                <td>{data.AvailabilityZone}</td>
                                                                <td>{data.LifecycleState}</td>
                                                                <td>{data.HealthStatus}</td>
                                                                <td>
                                                                    <Button variant="danger" onClick={() => terminateInstance(data.InstanceId)}>
                                                                        <i className="bi bi-power"></i>
                                                                    </Button>
                                                                </td>
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
    const res = await api.get('/autoscaling/instances', {headers: { "Authorization": "Bearer " + token}})
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

export default AutoScalingInstancesPage;