import Head from "next/head";
import Layout from "../../../components/layouts/Layout";
import api from "../../../utils/api";
import { useState } from "react";
import swal from "sweetalert";
import { useRouter } from "next/router";
import { Section, SectionHeader, SectionBody } from "../../../components/bootstrap/Section";
import { BreadcrumbHeader, BreadcrumbItem } from "../../../components/bootstrap/SectionBreadcrumb";
import { Card, Col, Row, Form, Button } from "react-bootstrap";

const EditStackPage = () => {
    const router = useRouter();
    const { name } = router.query;

    const [query, setQuery] = useState({
        stackname: name,
        code: null
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

    const formSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", query.stackname);
        formData.append('codeFile', query.code);
        api.post("/stacks/update",
            formData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then((response) => {
            swal({
                title: response.data.status,
                text: response.data.message,
                icon: "success",
            }).then(function () {
                router.push('/infrastructure');
            });
        }).catch((error) => {
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
                <title>Update Code &mdash; PgBooster</title>
            </Head>
            <Layout>
                <Section>
                    <SectionHeader title="Update Code">
                        <BreadcrumbHeader>
                            <BreadcrumbItem href="/dashboard" text="Dashboard" active />
                            <BreadcrumbItem href="/infrastructure" text="Code" active />
                            <BreadcrumbItem text="Update Code" />
                        </BreadcrumbHeader>
                    </SectionHeader>
                    <SectionBody title="Update your code" lead="Update your infrastructure by updating your code">
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
                                                    value={name}
                                                    onChange={handleParam()}
                                                    disabled
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

export default EditStackPage;