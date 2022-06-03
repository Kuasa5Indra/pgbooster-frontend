import Head from "next/head";
import Layout from "../../../components/layouts/Layout";
import { Section, SectionHeader, SectionBody } from "../../../components/bootstrap/Section";
import { Breadcrumb, BreadcrumbItem } from "../../../components/bootstrap/SectionBreadcrumb";
import { Card, Button, Table, Row, Col, Spinner } from "react-bootstrap";
import { EmptyState } from "../../../components/interface";
import api from "../../../utils/api";
import swal from "sweetalert";
import useSWR from "swr";
import dateFormat from "dateformat";
import { useRouter } from "next/router";

const fetcher = url => api.get(url).then(res => res.data.data)

const DatabaseSnapshotPage = () => {
    const router = useRouter();
    const { data, error } = useSWR('/database/snapshots', fetcher);
    const dbSnapshots = data;

    const deleteSnapshot = async (dbSnapshotId) => {
        swal({
            title: "Are you sure ?",
            text: "Once its deleted, you cannot recover it anymore",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    api.delete("/database/snapshots/" + dbSnapshotId)
                        .then((response) => {
                            swal({
                                title: response.data.status,
                                text: response.data.message,
                                icon: "success",
                            }).then(function () {
                                router.push('/database/snapshot');
                            });
                        }).catch((error) => {
                            // console.error("Error on", error.response);
                            swal({
                                title: error.response.data.status,
                                text: error.response.data.message,
                                icon: "error",
                            })
                        });
                }
            });
    }

    return (
        <>
            <Head>
                <title>DB Snapshots  &mdash; PgBooster</title>
            </Head>
            <Layout>
                <Section>
                    <SectionHeader title="Database Snapshots">
                        <Breadcrumb>
                            <BreadcrumbItem href="/dashboard" text="Home" />
                            <BreadcrumbItem text="Database Engine" />
                            <BreadcrumbItem text="DB Snapshots" active />
                        </Breadcrumb>
                    </SectionHeader>
                    <SectionBody>
                        <Row>
                            <Col sm={6} md={12} lg={12}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Database Snapshots</Card.Title>
                                        {!dbSnapshots ? (
                                            <div className="text-center">
                                                <br />
                                                <Spinner animation="border" variant="primary" />
                                            </div>
                                        ) : (dbSnapshots.length > 0 ? (
                                            <Table responsive="lg" bordered>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">DB Snapshot</th>
                                                        <th scope="col">Snapshot Type</th>
                                                        <th scope="col">DB Instance</th>
                                                        <th scope="col">Engine</th>
                                                        <th scope="col">Percent</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col">Created at</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dbSnapshots.map((data, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <th scope="row">{data.DBSnapshotIdentifier}</th>
                                                                <td>{data.SnapshotType}</td>
                                                                <td>{data.DBInstanceIdentifier}</td>
                                                                <td>{data.Engine}</td>
                                                                <td>{data.PercentProgress}</td>
                                                                <td>{data.Status}</td>
                                                                <td>{dateFormat(data.OriginalSnapshotCreateTime, "dd/mm/yyyy HH:MM:ss")}</td>
                                                                <td>
                                                                    {data.SnapshotType == 'manual' ? (
                                                                        <Button variant="danger" onClick={() => deleteSnapshot(data.DBSnapshotIdentifier)}>
                                                                            <i className="bi bi-trash"></i>
                                                                        </Button>
                                                                    ) : (
                                                                        <Button variant="danger" disabled>
                                                                            <i className="bi bi-trash"></i>
                                                                        </Button>
                                                                    )}
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

export default DatabaseSnapshotPage;