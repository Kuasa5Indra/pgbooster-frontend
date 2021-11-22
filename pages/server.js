import Head from "next/head";
import Layout from "../components/layouts/Layout";
import Link from "next/link";
import api from "../utils/api";
import swal from "sweetalert";
import { useRouter } from "next/router";
import { Card, Button, ButtonGroup, Table, Row, Col } from "react-bootstrap";

const ServerPage = ({ instances }) => {
    const router = useRouter();

    const startInstance = async(id) => {
        const res = await api.get("/instances/" + id + "/start")
        const instance = await res.data
        swal({
            title: instance.status,
            text: instance.message,
            icon: "success",
        }).then(function () {
            router.reload('/server');
        });
    };

    const stopInstance = async(id) => {
        swal({
            title: "Are you sure ?",
            text: "Once its stopped, you can still start your instance again",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    const res = await api.get("/instances/" + id + "/stop")
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

    const rebootInstance = async(id) => {
        const res = await api.get("/instances/" + id + "/reboot")
        const instance = await res.data
        swal({
            title: instance.status,
            text: instance.message,
            icon: "success",
        }).then(function () {
            router.reload('/server');
        });
    };

    const terminateInstance = async(id) => {
        swal({
            title: "Are you sure ?",
            text: "Once its terminated, you will not able to restore your instance",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    const res = await api.get("/instances/" + id + "/terminate")
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

    return (
        <>
            <Head>
                <title>Server &mdash; PgBooster</title>
            </Head>
            <Layout>
                <div className="main-content">
                    <section className="section">
                        <div className="section-header">
                            <h1>Server</h1>
                            <div className="section-header-breadcrumb">
                                <div className="breadcrumb-item active"><Link href="/dashboard"><a>Dashboard</a></Link></div>
                                <div className="breadcrumb-item">Server</div>
                            </div>
                        </div>

                        <div className="section-body">
                            <h2 className="section-title">Cloud Server</h2>
                            <p className="section-lead">
                                This is the list of running servers
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
                                                        <th>Name</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                {instances.data.map((data) => {
                                                    return (
                                                        <tbody key={data.ReservationId}>
                                                            {data.Instances.map((instance) => {
                                                                return (
                                                                    <tr key={instance.InstanceId}>
                                                                        <td>
                                                                            {instance.InstanceId}
                                                                        </td>
                                                                        <td>{instance.Tags.find((tag) => tag.Key == "Name").Value}</td>
                                                                        <td>{instance.State.Name}</td>
                                                                        <td>
                                                                            <ButtonGroup aria-label="Button Operation">
                                                                                <Button variant="primary" onClick={() => startInstance(instance.InstanceId)}>
                                                                                    <i className="fas fa-play-circle"></i> Start
                                                                                </Button>
                                                                                <Button variant="warning" onClick={() => stopInstance(instance.InstanceId)}>
                                                                                    <i className="fas fa-stop-circle"></i> Stop
                                                                                </Button>
                                                                                <Button variant="dark" onClick={() => rebootInstance(instance.InstanceId)}>
                                                                                    <i className="fas fa-bolt"></i> Reboot
                                                                                </Button>
                                                                                <Button variant="danger" onClick={() => terminateInstance(instance.InstanceId)}>
                                                                                    <i className="fas fa-power-off"></i> Terminate
                                                                                </Button>
                                                                            </ButtonGroup>
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            })}
                                                        </tbody>
                                                    );
                                                })}
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
    const res = await api.get('/instances')
    const instances = await res.data

    if (!instances) {
        return {
            notFound: true,
        }
    }

    return {
        props: { instances },
        revalidate: 10,
    }
}

export default ServerPage;