import Head from "next/head";
import Layout from "../../components/layouts/Layout";
import dateFormat from "dateformat";
import api from "../../utils/api";
import { useRouter } from 'next/router';
import { Section, SectionHeader, SectionBody } from "../../components/bootstrap/Section";
import { BreadcrumbHeader, BreadcrumbItem } from "../../components/bootstrap/SectionBreadcrumb";
import { Card, Row, Col, Button, ButtonGroup, Spinner } from "react-bootstrap";
import swal from "sweetalert";
import nookies from "nookies";
import useSWR from "swr";

const fetcher = url => api.get(url, {headers: { "Authorization": "Bearer " + nookies.get().token}}).then(res => res.data.data)

const ShowStackPage = () => {
    const router = useRouter();
    const { name } = router.query;
    const token = nookies.get().token;
    const { data, error } = useSWR(name ? `/stacks/describe/${name}` : null, fetcher);

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
                    api.get(`/stacks/update/${name}?protect=true`, {headers: { "Authorization": "Bearer " + token}})
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
                    api.get(`/stacks/update/${name}?protect=false`, {headers: { "Authorization": "Bearer " + token}})
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
                    api.delete("/stacks/" + name, {headers: { "Authorization": "Bearer " + token}})
                        .then((response) => {
                            swal({
                                title: response.data.status,
                                text: response.data.message,
                                icon: "success",
                            }).then(function () {
                                router.push('/infrastructure');
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
                                        {!data ? (
                                            <div className="text-center">
                                                <Spinner animation="border" variant="primary" />
                                            </div>
                                        ) : (
                                            <>
                                                <b>Stack Id</b> <p>{data[0].StackId}</p>
                                                <b>Stack Name</b> <p>{data[0].StackName}</p>
                                                <b>Stack Creation</b> <p>{dateFormat(data[0].CreationTime, "dd/mm/yyyy HH:MM:ss")}</p>
                                                <b>Stack Status</b> <p>{data[0].StackStatus}</p>
                                                <b>Disable Rollback</b>
                                                <p>{data[0].DisableRollback ? "true" : "false"}</p>
                                                <b>Enable Termination Protection</b>
                                                <p>{data[0].EnableTerminationProtection ? "true" : "false"}</p>
                                            </>
                                        )}
                                    </Card.Body>
                                    <Card.Footer>
                                        <ButtonGroup aria-label="Button Operation">
                                            <Button variant="warning" onClick={() => router.push({ pathname: '/infrastructure/edit/[name]', query: { name: name } })}>
                                                <i className="fas fa-edit"></i> Update
                                            </Button>
                                            {data && data[0].EnableTerminationProtection ? (
                                                <Button variant="danger" onClick={() => disableProtection()}>
                                                    <i className="fas fa-unlock"></i> Disable Termination Protection
                                                </Button>
                                            ) : (
                                                <>
                                                    <Button variant="success" onClick={() => enableProtection()}>
                                                        <i className="fas fa-lock"></i> Enable Termination Protection
                                                    </Button>
                                                    <Button variant="danger" onClick={() => deleteStack(name)}>
                                                        <i className="fas fa-trash"></i> Delete
                                                    </Button>
                                                </>
                                            )}
                                        </ButtonGroup>
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

export default ShowStackPage;