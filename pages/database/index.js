import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/layouts/Layout";
import { useRouter } from "next/router";
import api from "../../utils/api";
import swal from "sweetalert";
import { Section, SectionHeader, SectionBody } from "../../components/bootstrap/Section";
import { Breadcrumb, BreadcrumbItem } from "../../components/bootstrap/SectionBreadcrumb";
import { Card, Button, Table, Row, Col, ButtonGroup, Spinner } from "react-bootstrap";
import { EmptyState } from "../../components/interface";
import useSWR from "swr";

const fetcher = url => api.get(url).then(res => res.data.data)

const DatabaseInstancesPage = () => {
    const router = useRouter();
    const { data, error } = useSWR('/databases', fetcher);
    const databases = data;

    const startDbInstance = async (id) => {
        const res = await api.get("/databases/" + id + "/start")
        const dbInstance = await res.data
        swal({
            title: dbInstance.status,
            text: dbInstance.message,
            icon: "success",
        }).then(function () {
            router.reload('/database');
        });
    }

    const rebootDbInstance = async (id) => {
        const res = await api.get("/databases/" + id + "/reboot")
        const dbInstance = await res.data
        swal({
            title: dbInstance.status,
            text: dbInstance.message,
            icon: "success",
        }).then(function () {
            router.reload('/database');
        });
    }

    const stopDbInstance = async (id) => {
        swal({
            title: "Are you sure ?",
            text: "Once its stopped, you can still start your database instance again",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willStop) => {
                if (willStop) {
                    const res = await api.get("/databases/" + id + "/stop")
                    const dbInstance = await res.data
                    swal({
                        title: dbInstance.status,
                        text: dbInstance.message,
                        icon: "success",
                    }).then(function () {
                        router.reload('/database');
                    });
                }
            });
    }

    const failoverDbInstance = async (id) => {
        swal({
            title: "Are you sure ?",
            text: "It will switch between primary and secondary instances",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willFailover) => {
                if (willFailover) {
                    const res = await api.get("/databases/" + id + "/failover")
                    const dbInstance = await res.data
                    swal({
                        title: dbInstance.status,
                        text: dbInstance.message,
                        icon: "success",
                    }).then(function () {
                        router.reload('/database');
                    });
                }
            });
    }

    return (
        <>
            <Head>
                <title>DB Instances  &mdash; PgBooster</title>
            </Head>
            <Layout>
                <Section>
                    <SectionHeader title="Database Instances">
                        <Breadcrumb>
                            <BreadcrumbItem href="/dashboard" text="Home" />
                            <BreadcrumbItem text="Database Engine" />
                            <BreadcrumbItem text="DB Instances" active />
                        </Breadcrumb>
                    </SectionHeader>
                    <SectionBody>
                        <Row>
                            <Col sm={6} md={12} lg={12}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Database Instances</Card.Title>
                                        {!databases ? (
                                            <div className="text-center">
                                                <br />
                                                <Spinner animation="border" variant="primary" />
                                            </div>
                                        ) : (databases.length > 0 ? (
                                            <Table responsive="lg" bordered>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">DB ID</th>
                                                        <th scope="col">Engine</th>
                                                        <th scope="col">Region & AZ</th>
                                                        <th scope="col">Multi-AZ</th>
                                                        <th scope="col">VPC</th>
                                                        <th scope="col">Instance Class</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {databases.map((data, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <th scope="row">
                                                                    <Link href={{
                                                                        pathname: '/database/[id]',
                                                                        query: { id: data.DBInstanceIdentifier },
                                                                    }} replace>
                                                                        <a>{data.DBInstanceIdentifier}</a>
                                                                    </Link>
                                                                </th>
                                                                <td>{data.Engine}</td>
                                                                <td>{data.AvailabilityZone}</td>
                                                                <td>{data.MultiAZ ? 'Yes' : 'No'}</td>
                                                                <td>{data.DBSubnetGroup.VpcId}</td>
                                                                <td>{data.DBInstanceClass}</td>
                                                                <td>{data.DBInstanceStatus}</td>
                                                                <td>
                                                                    <ButtonGroup aria-label="Button Operation">
                                                                        <Button variant="primary" onClick={() => startDbInstance(data.DBInstanceIdentifier)}>
                                                                            <i className="bi bi-play-circle"></i> Start
                                                                        </Button>
                                                                        <Button variant="danger" onClick={() => stopDbInstance(data.DBInstanceIdentifier)}>
                                                                            <i className="bi bi-stop-circle"></i> Stop
                                                                        </Button>
                                                                        <Button variant="dark" onClick={() => rebootDbInstance(data.DBInstanceIdentifier)}>
                                                                            <i className="bi bi-lightning-fill"></i> Reboot
                                                                        </Button>
                                                                        <Button variant="warning" onClick={() => failoverDbInstance(data.DBInstanceIdentifier)} disabled={!data.MultiAZ ? true : false}>
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
};

export default DatabaseInstancesPage;
