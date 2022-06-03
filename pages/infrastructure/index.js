import Head from "next/head";
import Layout from "../../components/layouts/Layout";
import dateFormat from "dateformat";
import { useRouter } from "next/router";
import api from "../../utils/api";
import { Section, SectionHeader, SectionBody } from "../../components/bootstrap/Section";
import { Breadcrumb, BreadcrumbItem } from "../../components/bootstrap/SectionBreadcrumb";
import { Card, Button, Table, Row, Col, Spinner } from "react-bootstrap";
import { EmptyState } from "../../components/interface";
import useSWR from "swr";

const fetcher = url => api.get(url).then(res => res.data.data)

const InfrastructurePage = () => {
    const router = useRouter();
    const { data, error } = useSWR('/stacks', fetcher);
    const stacks = data;

    return (
        <>
            <Head>
                <title>Stack  &mdash; PgBooster</title>
            </Head>
            <Layout>
                <Section>
                    <SectionHeader title="Infrastructure as Code">
                        <Breadcrumb>
                            <BreadcrumbItem href="/dashboard" text="Home" />
                            <BreadcrumbItem text="Infrastructure" />
                            <BreadcrumbItem text="Stack" active />
                        </Breadcrumb>
                    </SectionHeader>
                    <SectionBody>
                        <Row>
                            <Col sm={6} md={12} lg={12}>
                                <Card>
                                    <Card.Header><Button onClick={() => router.push('/infrastructure/create')}><i className="bi bi-file-code-fill"></i> Upload Code</Button></Card.Header>
                                    <Card.Body>
                                        <Card.Title>Stack</Card.Title>
                                        {!stacks ? (
                                            <div className="text-center">
                                                <br />
                                                <Spinner animation="border" variant="primary" />
                                            </div>
                                        ) : (stacks.length > 0 ? (
                                            <Table responsive="lg" bordered>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col">Created at</th>
                                                        <th scope="col">Info Stack</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {stacks.map((data, index) => {
                                                        return (
                                                            <tr key={data.StackId}>
                                                                <th scope="row">{index + 1}</th>
                                                                <td>{data.StackName}</td>
                                                                <td>{data.StackStatus}</td>
                                                                <td>{dateFormat(data.CreationTime, "dd/mm/yyyy HH:MM:ss")}</td>
                                                                <td>
                                                                    <Button variant="info" onClick={() => router.push({ pathname: '/infrastructure/[name]', query: { name: data.StackName } })}><i className="bi bi-info-circle"></i></Button>
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

export default InfrastructurePage;