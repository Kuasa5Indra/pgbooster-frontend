import Head from "next/head";
import Layout from "../../components/layouts/Layout";
import { Overview, Resources, Events, Templates } from "../../components/interface/StackTabs";
import api from "../../utils/api";
import { useRouter } from 'next/router';
import { Section, SectionHeader, SectionBody } from "../../components/bootstrap/Section";
import { Breadcrumb, BreadcrumbItem } from "../../components/bootstrap/SectionBreadcrumb";
import { Card, Row, Col, Button, ButtonGroup, Tabs, Tab } from "react-bootstrap";
import swal from "sweetalert";
import useSWR from "swr";

const fetcher = url => api.get(url).then(res => res.data.data)

const ShowStackPage = () => {
    const router = useRouter();
    const { name } = router.query;
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
                        <Breadcrumb>
                            <BreadcrumbItem href="/dashboard" text="Home" />
                            <BreadcrumbItem text="Infrastructure" />
                            <BreadcrumbItem href="/infrastructure" text="Stack" />
                            <BreadcrumbItem text={name} active />
                        </Breadcrumb>
                    </SectionHeader>
                    <SectionBody>
                        <Row>
                            <Col sm={6} md={12} lg={12}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Detail Stack</Card.Title>
                                        <Tabs defaultActiveKey="overview" id="stack-info" className="nav-tabs-bordered d-flex">
                                            <Tab eventKey="overview" title="Overview">
                                                <Overview />
                                            </Tab>
                                            <Tab eventKey="events" title="Events">
                                                <Events />
                                            </Tab>
                                            <Tab eventKey="resources" title="Resources">
                                                <Resources />
                                            </Tab>
                                            <Tab eventKey="template" title="Template">
                                                <Templates />
                                            </Tab>
                                        </Tabs>
                                    </Card.Body>
                                    <Card.Footer>
                                        <ButtonGroup aria-label="Button Operation">
                                            <Button variant="warning" onClick={() => router.push({ pathname: '/infrastructure/edit/[name]', query: { name: name } })}>
                                                <i className="bi bi-pencil-square"></i> Update
                                            </Button>
                                            {data && data[0].EnableTerminationProtection ? (
                                                <Button variant="danger" onClick={() => disableProtection()}>
                                                    <i className="bi bi-unlock-fill"></i> Disable Termination Protection
                                                </Button>
                                            ) : (
                                                <>
                                                    <Button variant="success" onClick={() => enableProtection()}>
                                                        <i className="bi bi-lock-fill"></i> Enable Termination Protection
                                                    </Button>
                                                    <Button variant="danger" onClick={() => deleteStack(name)}>
                                                        <i className="bi bi-trash"></i> Delete
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