import Head from "next/head";
import Layout from "../../components/layouts/Layout";
import Link from "next/link";
import dateFormat from "dateformat";
import api from "../../utils/api";
import { useRouter } from 'next/router';
import { Card, Table, Row, Col } from "react-bootstrap";

function show({ stack }) {
    const router = useRouter();
    const { name } = router.query;

    return (
        <>
            <Head>
                <title>Detail Stack &mdash; PgBooster</title>
            </Head>
            <Layout>
                <div className="main-content">
                    <section className="section">
                        <div className="section-header">
                            <h1>Detail Stack</h1>
                            <div className="section-header-breadcrumb">
                                <div className="breadcrumb-item active"><Link href="/dashboard"><a>Dashboard</a></Link></div>
                                <div className="breadcrumb-item active"><Link href="/infrastructure"><a>Code</a></Link></div>
                                <div className="breadcrumb-item">Detail Stack</div>
                            </div>
                        </div>

                        <div className="section-body">
                            <h2 className="section-title">{name}</h2>
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

export async function getStaticPaths() {
    const res = await api.get("/stacks")
    const stacks = await res.data.data

    const paths = stacks.map((stack) => ({
        params: { name: stack.StackName },
    }))

    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const res = await api.get(`/stacks/describe?name=${params.name}`)
    const stack = await res.data.data
    return { props: { stack } }
}

export default show;