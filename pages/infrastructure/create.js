import Head from "next/head";
import Layout from "../../components/layouts/Layout";
import swal from "sweetalert";
import { useRouter } from "next/router";
import api from "../../utils/api";
import { Section, SectionHeader, SectionBody } from "../../components/bootstrap/Section";
import { Breadcrumb, BreadcrumbItem } from "../../components/bootstrap/SectionBreadcrumb";
import { Card, Col, Row, Form, Button, FormControl } from "react-bootstrap";
import { Formik } from 'formik';
import * as Yup from 'yup';
import nookies from "nookies";

const schema = Yup.object().shape({
    stackname: Yup.string().matches(/[a-zA-Z\d]-+/, "The stack name can include letters (A-Z and a-z), numbers (0-9), and hyphens (-).").required(),
    code: Yup.mixed().required("File is required"),
    disable_rollback: Yup.bool().required(),
    protection: Yup.bool().required()
});

const CreateStackPage = () => {
    const router = useRouter();
    const token = nookies.get().token;
    return (
        <>
            <Head>
                <title>Create Stack  &mdash; PgBooster</title>
            </Head>
            <Layout>
                <Section>
                    <SectionHeader title="Create Stack">
                        <Breadcrumb>
                            <BreadcrumbItem href="/dashboard" text="Home" />
                            <BreadcrumbItem text="Infrastructure" />
                            <BreadcrumbItem href="/infrastructure" text="Stack" />
                            <BreadcrumbItem text="Create Stack" active />
                        </Breadcrumb>
                    </SectionHeader>
                    <SectionBody>
                        <Row>
                            <Col sm={6} md={12} lg={12}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Create Stack</Card.Title>
                                        <Formik
                                            validationSchema={schema}
                                            validateOnChange={false}
                                            initialValues={{
                                                stackname: "",
                                                code: null,
                                                disable_rollback: false,
                                                protection: false
                                            }}
                                            onSubmit={(values) => {
                                                const formData = new FormData();
                                                formData.append("name", values.stackname);
                                                formData.append('codeFile', values.code);
                                                formData.append('disable_rollback', values.disable_rollback);
                                                formData.append('protect', values.protection);
                                                api.post("/stacks", formData, {headers: { "Authorization": "Bearer " + token}})
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
                                                        var errorData = error.response.data;
                                                        swal({
                                                            title: errorData.title,
                                                            text: errorData.message,
                                                            icon: "error",
                                                        })
                                                        // console.error("Error on", error.response.headers);
                                                        // console.log(error.response.data);
                                                        // console.log(error.response.status);
                                                    });
                                            }}
                                        >
                                            {({ handleSubmit, handleChange, values, errors, setFieldValue }) => (
                                                <Form onSubmit={handleSubmit} encType="multipart/form-data">
                                                    <Row className="g-3">
                                                        <Col bsPrefix="col-12">
                                                            <Form.Group>
                                                                <Form.Label>Stack Name</Form.Label>
                                                                <Form.Control
                                                                    name="stackname"
                                                                    placeholder="example-stack"
                                                                    value={values.stackname}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!errors.stackname}
                                                                />
                                                                <FormControl.Feedback type="invalid">{errors.stackname}</FormControl.Feedback>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col bsPrefix="col-12">
                                                            <Form.Group>
                                                                <Form.Label>JSON / YAML code</Form.Label>
                                                                <Form.Control
                                                                    name="code"
                                                                    accept=".json, .yaml, .yml"
                                                                    type="file"
                                                                    onChange={(e) => setFieldValue('code', e.target.files[0])}
                                                                    isInvalid={!!errors.code}
                                                                />
                                                                <FormControl.Feedback type="invalid">{errors.code}</FormControl.Feedback>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col bsPrefix="col-12">
                                                            <Form.Group>
                                                                <Form.Label>Disable Rollback</Form.Label>
                                                                <Form.Check
                                                                    type="radio"
                                                                    label="True"
                                                                    name="disable_rollback"
                                                                    value="true"
                                                                    onChange={() => setFieldValue('disable_rollback', true)}
                                                                />
                                                                <Form.Check
                                                                    type="radio"
                                                                    label="False"
                                                                    name="disable_rollback"
                                                                    value="false"
                                                                    onChange={() => setFieldValue('disable_rollback', false)}
                                                                    defaultChecked
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col bsPrefix="col-12">
                                                            <Form.Group>
                                                                <Form.Label>Enable Termination Protection</Form.Label>
                                                                <Form.Check
                                                                    type="radio"
                                                                    label="True"
                                                                    name="protection"
                                                                    value="true"
                                                                    onChange={() => setFieldValue('protection', true)}
                                                                />
                                                                <Form.Check
                                                                    type="radio"
                                                                    label="False"
                                                                    name="protection"
                                                                    value="false"
                                                                    onChange={() => setFieldValue('protection', false)}
                                                                    defaultChecked
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col bsPrefix="col-12">
                                                            <Button type="submit">Submit</Button>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            )}
                                        </Formik>
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

export default CreateStackPage;