import Head from "next/head";
import Layout from "../../components/layouts/Layout";
import dateFormat from "dateformat";
import { useRouter } from "next/router";
import api from "../../utils/api";
import swal from "sweetalert";
import { Section, SectionHeader, SectionBody } from "../../components/bootstrap/Section";
import { BreadcrumbHeader, BreadcrumbItem } from "../../components/bootstrap/SectionBreadcrumb";
import { Card, Button, ButtonGroup, Table, Row, Col } from "react-bootstrap";
import { EmptyState } from "../../components/interface";
import nookies from "nookies";

const InfrastructurePage = ({ stacks }) => {
    const router = useRouter();

    const deleteStack = async (name) => {
        swal({
            title: "Are you sure ?",
            text: "Once its deleted, you will not able to restore your stack",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    api.delete("/stacks/" + name)
                        .then((response) => {
                            swal({
                                title: response.data.status,
                                text: response.data.message,
                                icon: "success",
                            }).then(function () {
                                router.reload('/infrastructure');
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
                <title>Code &mdash; PgBooster</title>
            </Head>
            <Layout>
                <Section>
                    <SectionHeader title="Code">
                        <BreadcrumbHeader>
                            <BreadcrumbItem href="/dashboard" text="Dashboard" active />
                            <BreadcrumbItem text="Code" />
                        </BreadcrumbHeader>
                    </SectionHeader>
                    <SectionBody title="Infrastructure as Code" lead="This is the list of stacks that have built with code">
                        <Row>
                            <Col sm={6} md={12} lg={12}>
                                <Card>
                                    <Card.Header><h4>Stacks</h4></Card.Header>
                                    <Card.Body>
                                        {stacks.data.length > 0 ? (
                                            <>
                                                <Button onClick={() => router.push('/infrastructure/create')} className="float-left">
                                                    <i className="fas fa-file-upload"></i> Upload Code
                                                </Button>
                                                <br /><br />
                                                <Table responsive="md" bordered>
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Name</th>
                                                            <th>Status</th>
                                                            <th>Created at</th>
                                                            <th>Info Stack</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {stacks.data.map((data, index) => {
                                                            return (
                                                                <tr key={data.StackId}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{data.StackName}</td>
                                                                    <td>{data.StackStatus}</td>
                                                                    <td>{dateFormat(data.CreationTime, "dd/mm/yyyy HH:MM:ss")}</td>
                                                                    <td>
                                                                        <Button variant="info" onClick={() => router.push({ pathname: '/infrastructure/[name]', query: { name: data.StackName } })}>
                                                                            <i className="fas fa-info-circle"></i>
                                                                        </Button>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </Table>
                                            </>
                                        ) : (
                                            <EmptyState>
                                                <Button onClick={() => router.push('/infrastructure/create')} className="float-left">
                                                    <i className="fas fa-file-upload"></i> Upload Code
                                                </Button>
                                            </EmptyState>
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
    const res = await api.get('/stacks', {headers: { "Authorization": "Bearer " + token}})
    const stacks = await res.data

    if (!stacks) {
        return {
            notFound: true,
        }
    }

    return {
        props: { stacks }
    }
}

export default InfrastructurePage;