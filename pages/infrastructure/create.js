import Head from "next/head";
import Layout from "../../components/layouts/Layout";
import swal from "sweetalert";
import { useRouter } from "next/router";
import api from "../../utils/api";
import { Section, SectionHeader, SectionBody } from "../../components/bootstrap/Section";
import { BreadcrumbHeader, BreadcrumbItem } from "../../components/bootstrap/SectionBreadcrumb";
import { Card, Col, Row, Form, Button, FormControl } from "react-bootstrap";
import { Formik } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object().shape({
    stackname: Yup.string().matches(/[a-zA-Z\d]-+/, "The stack name can include letters (A-Z and a-z), numbers (0-9), and hyphens (-).").required(),
    code: Yup.mixed().required("File is required"),
    disable_rollback: Yup.bool().required(),
    protection: Yup.bool().required()
});

const CreateStackPage = () => {
    const router = useRouter();

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
                                    <Formik
                                        validationSchema={schema}
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
                                            <Form noValidate onSubmit={handleSubmit} encType="multipart/form-data">
                                                <Card.Body>
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
                                                    <Form.Group>
                                                        <Form.Label>JSON / YAML code</Form.Label>
                                                        <Form.File
                                                            name="code"
                                                            className="form-control-file"
                                                            accept=".json, .yaml, .yml"
                                                            onChange={(e) => setFieldValue('code', e.target.files[0])}
                                                            isInvalid={!!errors.code}
                                                            feedback={errors.code}
                                                        />
                                                    </Form.Group>
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
                                                </Card.Body>
                                                <Card.Footer>
                                                    <Button type="submit">Submit</Button>
                                                </Card.Footer>
                                            </Form>
                                        )}
                                    </Formik>
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