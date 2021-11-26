import Head from "next/head";
import Layout from "../../components/layouts/Layout";
import dateFormat from "dateformat";
import api from "../../utils/api";
import { useRouter } from 'next/router';
import { Section, SectionHeader, SectionBody } from "../../components/bootstrap/Section";
import { BreadcrumbHeader, BreadcrumbItem } from "../../components/bootstrap/SectionBreadcrumb";
import { Card, Row, Col, Button } from "react-bootstrap";
import swal from "sweetalert";

const ShowStackPage = ({ stack }) => {
    const router = useRouter();
    const { name } = router.query;

    const enableProtection = () => {
        swal({
            title: "Are you sure ?",
            text: "Once enabled, you will not able to delete your stack",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willEnable) => {
                if (willEnable) {
                    api.get(`/stacks/update/${name}?protect=true`)
                        .then((response) => {
                            swal({
                                title: response.data.status,
                                text: response.data.message,
                                icon: "success",
                            }).then(function () {
                                router.reload('/infrastructure/' + name);
                            });
                        }).catch((error) => {
                            console.error("Error on", error.response);
                        });
                }
            });
    }

    const disableProtection = () => {
        swal({
            title: "Are you sure ?",
            text: "Once disable, you will be able to delete your stack",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDisable) => {
                if (willDisable) {
                    api.get(`/stacks/update/${name}?protect=false`)
                        .then((response) => {
                            swal({
                                title: response.data.status,
                                text: response.data.message,
                                icon: "success",
                            }).then(function () {
                                router.reload('/infrastructure/' + name);
                            });
                        }).catch((error) => {
                            console.error("Error on", error.response);
                        });
                }
            });
    }

    return (
        <>
            <Head>
                <title>Detail Stack &mdash; PgBooster</title>
            </Head>
            <Layout>
                <Section>
                    <SectionHeader title="Detail Stack">
                        <BreadcrumbHeader>
                            <BreadcrumbItem href="/dashboard" text="Dashboard" active />
                            <BreadcrumbItem href="/infrastructure" text="Code" active />
                            <BreadcrumbItem text="Detail Stack" />
                        </BreadcrumbHeader>
                    </SectionHeader>
                    <SectionBody title={name}>
                        <Row>
                            <Col sm={6} md={12} lg={12}>
                                <Card>
                                    <Card.Header><h4>Stack Information</h4></Card.Header>
                                    <Card.Body>
                                        <b>Stack Id</b> <p>{stack[0].StackId}</p>
                                        <b>Stack Name</b> <p>{stack[0].StackName}</p>
                                        <b>Stack Creation</b> <p>{dateFormat(stack[0].CreationTime, "dd/mm/yyyy HH:MM:ss")}</p>
                                        <b>Stack Status</b> <p>{stack[0].StackStatus}</p>
                                        <b>Disable Rollback</b>
                                        <p>{stack[0].DisableRollback ? "true" : "false"}</p>
                                        <b>Enable Termination Protection</b>
                                        <p>{stack[0].EnableTerminationProtection ? "true" : "false"}</p>
                                    </Card.Body>
                                    <Card.Footer>
                                        {stack[0].EnableTerminationProtection ? (
                                            <Button variant="danger" onClick={() => disableProtection()}>Disable Termination Protection</Button>
                                        ) : (
                                            <Button variant="success" onClick={() => enableProtection()}>Enable Termination Protection</Button>
                                        )}
                                    </Card.Footer>
                                </Card>
                            </Col>
                        </Row>
                    </SectionBody>
                </Section>
            </Layout>
        </>
    );
}

export async function getStaticPaths() {
    const res = await api.get("/stacks")
    const stacks = await res.data.data

    const paths = stacks.map((stack) => ({
        params: { name: stack.StackName },
    }))

    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const res = await api.get(`/stacks/describe/${params.name}`)
    const stack = await res.data.data
    return { props: { stack } }
}

export default ShowStackPage;