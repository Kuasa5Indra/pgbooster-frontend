import Head from "next/head";
import Link from "next/link";
import Layout from "../../../components/layouts/Layout";
import { useRouter } from "next/router";
import api from "../../../utils/api";
import swal from "sweetalert";
import { Section, SectionHeader, SectionBody } from "../../../components/bootstrap/Section";
import { Breadcrumb, BreadcrumbItem } from "../../../components/bootstrap/SectionBreadcrumb";
import { Card, Button, Table, Row, Col, ButtonGroup, Spinner } from "react-bootstrap";
import { EmptyState } from "../../../components/interface";
import useSWR from "swr";

const fetcher = url => api.get(url).then(res => res.data.data)

const DatabaseClustersPage = () => {
    const router = useRouter();
    const { data, error } = useSWR('/database-clusters', fetcher);
    const clusters = data;

    const startDbCluster = async (id) => {
        const res = await api.get("/database-clusters/" + id + "/start")
        const dbCluster = await res.data
        swal({
            title: dbCluster.status,
            text: dbCluster.message,
            icon: "success",
        }).then(function () {
            router.reload('/database/cluster');
        });
    }

    const rebootDbCluster = async (id) => {
        const res = await api.get("/database-clusters/" + id + "/reboot")
        const dbCluster = await res.data
        swal({
            title: dbCluster.status,
            text: dbCluster.message,
            icon: "success",
        }).then(function () {
            router.reload('/database/cluster');
        });
    }

    const stopDbCluster = async (id) => {
        swal({
            title: "Are you sure ?",
            text: "Once its stopped, you can still start your database cluster again",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willStop) => {
                if (willStop) {
                    const res = await api.get("/database-clusters/" + id + "/stop")
                    const dbCluster = await res.data
                    swal({
                        title: dbCluster.status,
                        text: dbCluster.message,
                        icon: "success",
                    }).then(function () {
                        router.reload('/database/cluster');
                    });
                }
            });
    }

    const failoverDbCluster = async (id) => {
        swal({
            title: "Are you sure ?",
            text: "It will switch between writer and reader instances",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willFailover) => {
                if (willFailover) {
                    const res = await api.get("/database-clusters/" + id + "/failover")
                    const dbCluster = await res.data
                    swal({
                        title: dbCluster.status,
                        text: dbCluster.message,
                        icon: "success",
                    }).then(function () {
                        router.reload('/database/cluster');
                    });
                }
            });
    }

    return (
        <>
            <Head>
                <title>DB Clusters  &mdash; PgBooster</title>
            </Head>
            <Layout>
                <Section>
                    <SectionHeader title="Database Clusters">
                        <Breadcrumb>
                            <BreadcrumbItem href="/dashboard" text="Home" />
                            <BreadcrumbItem text="Database Engine" />
                            <BreadcrumbItem text="DB Clusters" active />
                        </Breadcrumb>
                    </SectionHeader>
                    <SectionBody>
                        <Row>
                            <Col sm={6} md={12} lg={12}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Database Clusters</Card.Title>
                                        {!clusters ? (
                                            <div className="text-center">
                                                <br />
                                                <Spinner animation="border" variant="primary" />
                                            </div>
                                        ) : (clusters.length > 0 ? (
                                            <Table responsive="lg" bordered>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">DB ID</th>
                                                        <th scope="col">Engine</th>
                                                        <th scope="col">Availability Zones</th>
                                                        <th scope="col">Multi-AZ</th>
                                                        <th scope="col">DB Subnet</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {clusters.map((data, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <th scope="row">
                                                                    <Link href={{
                                                                        pathname: '/database/cluster/[id]',
                                                                        query: { id: data.DBClusterIdentifier },
                                                                    }} replace>
                                                                        <a>{data.DBClusterIdentifier}</a>
                                                                    </Link>
                                                                </th>
                                                                <td>{data.Engine}</td>
                                                                <td>{data.AvailabilityZones.join(", ")}</td>
                                                                <td>{data.MultiAZ ? 'Yes' : 'No'}</td>
                                                                <td>{data.DBSubnetGroup}</td>
                                                                <td>{data.Status}</td>
                                                                <td>
                                                                    <ButtonGroup aria-label="Button Operation">
                                                                        <Button variant="primary" onClick={() => startDbCluster(data.DBClusterIdentifier)}>
                                                                            <i className="bi bi-play-circle"></i> Start
                                                                        </Button>
                                                                        <Button variant="danger" onClick={() => stopDbCluster(data.DBClusterIdentifier)}>
                                                                            <i className="bi bi-stop-circle"></i> Stop
                                                                        </Button>
                                                                        <Button variant="dark" onClick={() => rebootDbCluster(data.DBClusterIdentifier)}>
                                                                            <i className="bi bi-lightning-fill"></i> Reboot
                                                                        </Button>
                                                                        <Button variant="warning" onClick={() => failoverDbCluster(data.DBClusterIdentifier)}>
                                                                            <i className="bi bi-lightning-fill"></i> Failover
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

export default DatabaseClustersPage;