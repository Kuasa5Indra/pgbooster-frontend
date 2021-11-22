import Head from "next/head";
import Layout from "../../../components/layouts/Layout";
import Link from "next/link";
import api from "../../../utils/api";
import { useState } from "react";
import swal from "sweetalert";
import { useRouter } from "next/router";
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
                <div className="main-content">
                    <section className="section">
                        <div className="section-header">
                            <h1>Update Code</h1>
                            <div className="section-header-breadcrumb">
                                <div className="breadcrumb-item active"><Link href="/dashboard"><a>Dashboard</a></Link></div>
                                <div className="breadcrumb-item active"><Link href="/infrastructure"><a>Code</a></Link></div>
                                <div className="breadcrumb-item">Update Code</div>
                            </div>
                        </div>

                        <div className="section-body">
                            <h2 className="section-title">Update your code</h2>
                            <p className="section-lead">Update your infrastructure by updating your code</p>
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
                        </div>
                    </section>
                </div>
            </Layout>
        </>
    );
}

export default EditStackPage;