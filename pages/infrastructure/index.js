import Head from "next/head";
import Layout from "../../components/layouts/Layout";
import Link from "next/link";
import dateFormat from "dateformat";
import { useRouter } from "next/router";
import api from "../../utils/api";
import swal from "sweetalert";
import { Card, Button, ButtonGroup, Table, Row, Col } from "react-bootstrap";

const InfrastructurePage = ({ stacks }) => {
    const router = useRouter();

    const deleteStack = async(name) => {
        swal({
            title: "Are you sure ?",
            text: "Once its deleted, you will not able to restore your stack",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    api.delete("/stacks?name=" + name)
                        .then((response) => {
                            swal({
                                title: response.data.status,
                                text: response.data.message,
                                icon: "success",
                            }).then(function () {
                                router.reload('/infrastructure');
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
                <title>Code &mdash; PgBooster</title>
            </Head>
            <Layout>
                <div className="main-content">
                    <section className="section">
                        <div className="section-header">
                            <h1>Code</h1>
                            <div className="section-header-breadcrumb">
                                <div className="breadcrumb-item active"><Link href="/dashboard"><a>Dashboard</a></Link></div>
                                <div className="breadcrumb-item">Code</div>
                            </div>
                        </div>

                        <div className="section-body">
                            <h2 className="section-title">Infrastructure as Code</h2>
                            <p className="section-lead">
                                This is the list of stack that have built with code
                            </p>
                            
                            <Row>
                                <Col sm={6} md={12} lg={12}>
                                    <Card>
                                        <Card.Header><h4>Instances</h4></Card.Header>
                                        <Card.Body>
                                            <Button onClick={() => router.push('/infrastructure/create')} className="float-left">
                                                Upload Code
                                            </Button>
                                            <br /><br />
                                            <Table responsive="md" bordered>
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Name</th>
                                                        <th>Status</th>
                                                        <th>Created at</th>
                                                        <th>Action</th>
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
                                                                    <ButtonGroup aria-label="Button Operation">
                                                                        <Button variant="info" onClick={() => router.push({ pathname: '/infrastructure/[name]', query: { name: data.StackName } })}>
                                                                            <i className="fas fa-info-circle"></i> Info
                                                                        </Button>
                                                                        <Button variant="warning" onClick={() => router.push({ pathname: '/infrastructure/edit/[name]', query: { name: data.StackName } })}>
                                                                            <i className="fas fa-edit"></i> Update
                                                                        </Button>
                                                                        <Button variant="danger" onClick={() => deleteStack(data.StackName)}>
                                                                            <i className="fas fa-trash"></i> Delete
                                                                        </Button>
                                                                    </ButtonGroup>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
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
    const res = await api.get('/stacks')
    const stacks = await res.data

    if (!stacks) {
        return {
            notFound: true,
        }
    }

    return {
        props: { stacks },
        revalidate: 10,
    }
}

export default InfrastructurePage;