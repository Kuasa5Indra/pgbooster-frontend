import Head from "next/head";
import Layout from "../../components/layouts/Layout";
import api from "../../utils/api";
import swal from "sweetalert";
import { useRouter } from "next/router";
import { Section, SectionHeader, SectionBody } from "../../components/bootstrap/Section";
import { Breadcrumb, BreadcrumbItem } from "../../components/bootstrap/SectionBreadcrumb";
import { Card, Button, ButtonGroup, Table, Row, Col } from "react-bootstrap";
import { EmptyState } from "../../components/interface";
import nookies from "nookies";

const InstancePage = ({ instances }) => {
    const router = useRouter();
    const token = nookies.get().token;

    const startInstance = async (id) => {
        const res = await api.get("/instances/" + id + "/start", {headers: { "Authorization": "Bearer " + token}})
        const instance = await res.data
        swal({
            title: instance.status,
            text: instance.message,
            icon: "success",
        }).then(function () {
            router.reload('/instance');
        });
    };

    const stopInstance = async (id) => {
        swal({
            title: "Are you sure ?",
            text: "Once its stopped, you can still start your instance again",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willStop) => {
                if (willStop) {
                    const res = await api.get("/instances/" + id + "/stop", {headers: { "Authorization": "Bearer " + token}})
                    const instance = await res.data
                    swal({
                        title: instance.status,
                        text: instance.message,
                        icon: "success",
                    }).then(function () {
                        router.reload('/instance');
                    });
                }
            });
    };

    const rebootInstance = async (id) => {
        const res = await api.get("/instances/" + id + "/reboot", {headers: { "Authorization": "Bearer " + token}})
        const instance = await res.data
        swal({
            title: instance.status,
            text: instance.message,
            icon: "success",
        }).then(function () {
            router.reload('/instance');
        });
    };

    const terminateInstance = async (id) => {
        swal({
            title: "Are you sure ?",
            text: "Once its terminated, you will not able to restore your instance",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willTerminate) => {
                if (willTerminate) {
                    const res = await api.get("/instances/" + id + "/terminate", {headers: { "Authorization": "Bearer " + token}})
                    const instance = await res.data
                    swal({
                        title: instance.status,
                        text: instance.message,
                        icon: "success",
                    }).then(function () {
                        router.reload('/server');
                    });
                }
            });
    };

    let items = [];

    instances.data.forEach((data, index) => {
        data.Instances.forEach((instance, index) => {
           items.push(instance);
        });
    });

    return (
        <>
            <Head>
                <title>Instance  &mdash; PgBooster</title>
            </Head>
            <Layout>
                <Section>
                    <SectionHeader title="Instance">
                        <Breadcrumb>
                            <BreadcrumbItem href="/dashboard" text="Home" />
                            <BreadcrumbItem text="Computing" />
                            <BreadcrumbItem text="Instance" active />
                        </Breadcrumb>
                    </SectionHeader>
                    <SectionBody>
                        <Row>
                            <Col sm={6} md={12} lg={12}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Instance</Card.Title>
                                        {instances.data.length > 0 ? (
                                            <Table responsive="lg" bordered>
                                                <thead>
                                                <tr>
                                                    <th scope="col">ID</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Info</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {items.map((instance) => {
                                                    return (
                                                        <tr key={instance.InstanceId}>
                                                            <th scope="row">{instance.InstanceId}</th>
                                                            <td>{instance.Tags.find((tag) => tag.Key == "Name").Value}</td>
                                                            <td>{instance.State.Name}</td>
                                                            <td>
                                                                <Button variant="info" onClick={() => router.push({ pathname: '/instance/[id]', query: { id: instance.InstanceId } })}><i className="bi bi-info-circle"></i></Button>
                                                            </td>
                                                            <td>
                                                                <ButtonGroup aria-label="Button Operation">
                                                                    <Button variant="primary" onClick={() => startInstance(instance.InstanceId)}>
                                                                        <i className="bi bi-play-circle"></i> Start
                                                                    </Button>
                                                                    <Button variant="warning" onClick={() => stopInstance(instance.InstanceId)}>
                                                                        <i className="bi bi-stop-circle"></i> Stop
                                                                    </Button>
                                                                    <Button variant="dark" onClick={() => rebootInstance(instance.InstanceId)}>
                                                                        <i className="bi bi-lightning-fill"></i> Reboot
                                                                    </Button>
                                                                    <Button variant="danger" onClick={() => terminateInstance(instance.InstanceId)}>
                                                                        <i className="bi bi-power"></i> Terminate
                                                                    </Button>
                                                                </ButtonGroup>
                                                            </td>
                                                        </tr>
                                                    );
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
    const res = await api.get('/instances', {headers: { "Authorization": "Bearer " + token}})
    const instances = await res.data

    if (!instances) {
        return {
            notFound: true,
        }
    }

    return {
        props: { instances }
    }
}

export default InstancePage;