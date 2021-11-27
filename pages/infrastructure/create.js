import Head from "next/head";
import Layout from "../../components/layouts/Layout";
import { useState } from "react";
import swal from "sweetalert";
import { useRouter } from "next/router";
import api from "../../utils/api";
import { Section, SectionHeader, SectionBody } from "../../components/bootstrap/Section";
import { BreadcrumbHeader, BreadcrumbItem } from "../../components/bootstrap/SectionBreadcrumb";
import { Card, Col, Row, Form, Button } from "react-bootstrap";

const CreateStackPage = () => {
    const router = useRouter();

    const [query, setQuery] = useState({
        stackname: "",
        code: null,
        disable_rollback: false,
        protection: false
    });

    const handleParam = () => (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setQuery((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = () => (e) => {
        setQuery((prevState) => ({
            ...prevState,
            code: e.target.files[0]
        }));

        console.log(e.target.files[0])
    };

    const handleRadio = () => (e) => {
        const name = e.target.name;
        const value = (e.target.value === 'true');
        setQuery((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const formSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", query.stackname);
        formData.append('codeFile', query.code);
        formData.append('disable_rollback', query.disable_rollback);
        formData.append('protect', query.protection);
        api.post("/stacks", formData)
            .then((response) => {
                swal({
                    title: response.data.status,
                    text: response.data.message,
                    icon: "success",
                }).then(function () {
                    router.push('/infrastructure');
                })
            })
            .catch((error) => {
                var errorData = error.response.data.errors;
                var errorMessages = errorData.map(({ msg }) => msg)
                swal({
                    title: "Error",
                    text: errorMessages.toString(),
                    icon: "error",
                })
                // console.error("Error on", error.response.headers);
                // console.log(error.response.data);
                // console.log(error.response.status);
            });
    };

    return (
        <>
            <Head>
                <title>Upload Code &mdash; PgBooster</title>
            </Head>
            <Layout>
                <Section>
                    <SectionHeader title="Upload Code">
                        <BreadcrumbHeader>
                            <BreadcrumbItem href="/dashboard" text="Dashboard" active />
                            <BreadcrumbItem href="/infrastructure" text="Code" active />
                            <BreadcrumbItem text="Upload Code" />
                        </BreadcrumbHeader>
                    </SectionHeader>
                    <SectionBody title="Upload your code" lead="Create your infrastructure using your code">
                        <Row>
                            <Col sm={6} md={12} lg={12}>
                                <Card>
                                    <Form onSubmit={formSubmit} encType="multipart/form-data">
                                        <Card.Body>
                                            <Form.Group>
                                                <Form.Label>Stack Name</Form.Label>
                                                <Form.Control
                                                    name="stackname"
                                                    placeholder="example-stack"
                                                    value={query.stackname}
                                                    onChange={handleParam()}
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>JSON / YAML code</Form.Label>
                                                <Form.File
                                                    name="code"
                                                    className="form-control-file"
                                                    accept=".json, .yaml, .yml"
                                                    onChange={handleFileChange()}
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Disable Rollback</Form.Label>
                                                <Form.Check
                                                    type="radio"
                                                    label="True"
                                                    name="disable_rollback"
                                                    value="true"
                                                    checked={query.disable_rollback}
                                                    onChange={handleRadio()}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="False"
                                                    name="disable_rollback"
                                                    value="false"
                                                    checked={!query.disable_rollback}
                                                    onChange={handleRadio()}
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Enable Termination Protection</Form.Label>
                                                <Form.Check
                                                    type="radio"
                                                    label="True"
                                                    name="protection"
                                                    value="true"
                                                    checked={query.protection}
                                                    onChange={handleRadio()}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="False"
                                                    name="protection"
                                                    value="false"
                                                    checked={!query.protection}
                                                    onChange={handleRadio()}
                                                />
                                            </Form.Group>
                                        </Card.Body>
                                        <Card.Footer>
                                            <Button type="submit">Submit</Button>
                                        </Card.Footer>
                                    </Form>
                                </Card>
                            </Col>
                        </Row>
                    </SectionBody>
                </Section>
            </Layout>
        </>
    );
}

export default CreateStackPage;