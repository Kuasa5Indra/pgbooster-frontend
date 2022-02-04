import Head from "next/head";
import Layout from "../../../components/layouts/Layout";
import api from "../../../utils/api";
import {useState} from "react";
import swal from "sweetalert";
import { useRouter } from "next/router";
import { Section, SectionHeader, SectionBody } from "../../../components/bootstrap/Section";
import { Breadcrumb, BreadcrumbItem } from "../../../components/bootstrap/SectionBreadcrumb";
import {Card, Col, Row, Form, Button, FormControl, ButtonGroup} from "react-bootstrap";
import { Formik } from 'formik';
import * as Yup from 'yup';
import nookies from "nookies";
import useSWR from "swr";

const fetcher = url => api.get(url, {headers: { "Authorization": "Bearer " + nookies.get().token}}).then(res => res.data.data)

const schema = Yup.object().shape({
    stackname: Yup.string().matches(/[a-zA-Z\d]-+/, "The stack name can include letters (A-Z and a-z), numbers (0-9), and hyphens (-).").required(),
    code: Yup.mixed().required("File is required"),
    disable_rollback: Yup.bool().required(),
});

const EditStackPage = () => {
    const router = useRouter();
    const { name } = router.query;
    const token = nookies.get().token;
    const { data, error } = useSWR(name ? `/stacks/describe/${name}` : null, fetcher);
    const [validateButton, setValidateButton] = useState(true);

    const validateTemplate = (code) => {
        if (code == null) {
            swal({
                title: "Something missing",
                text: "Upload your code first!",
                icon: "warning",
            })
        } else {
            const formData = new FormData();
            formData.append('codeFile', code);
            api.post("/stacks/validate", formData, {headers: {"Authorization": "Bearer " + token}})
                .then((response) => {
                    swal({
                        title: response.data.status,
                        text: response.data.message,
                        icon: "success",
                    }).then(function () {
                        setValidateButton(false);
                    })
                })
                .catch((error) => {
                    swal({
                        title: "Something wrong",
                        text: "Please review your code!",
                        icon: "error",
                    })
                })
        }
    }

    return (
        <>
            <Head>
                <title>Update Stack  &mdash; PgBooster</title>
            </Head>
            <Layout>
                <Section>
                    <SectionHeader title="Update Stack">
                        <Breadcrumb>
                            <BreadcrumbItem href="/dashboard" text="Home" />
                            <BreadcrumbItem text="Infrastructure" />
                            <BreadcrumbItem href="/infrastructure" text="Stack" />
                            <BreadcrumbItem text="Update Stack" />
                            <BreadcrumbItem text={name} active />
                        </Breadcrumb>
                    </SectionHeader>
                    <SectionBody>
                        <Row>
                            <Col sm={6} md={12} lg={12}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Update Stack</Card.Title>
                                        <Formik
                                            validationSchema={schema}
                                            validateOnChange={false}
                                            initialValues={{
                                                stackname: name,
                                                code: null,
                                                disable_rollback: data[0].DisableRollback
                                            }}
                                            onSubmit={(values) => {
                                                const formData = new FormData();
                                                formData.append("name", values.stackname);
                                                formData.append('codeFile', values.code);
                                                formData.append('disable_rollback', values.disable_rollback);
                                                api.post("/stacks/update", formData, {headers: { "Authorization": "Bearer " + token}})
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
                                                                    value={name}
                                                                    onChange={handleChange}
                                                                    disabled
                                                                />
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
                                                                    checked={values.disable_rollback}
                                                                />
                                                                <Form.Check
                                                                    type="radio"
                                                                    label="False"
                                                                    name="disable_rollback"
                                                                    value="false"
                                                                    onChange={() => setFieldValue('disable_rollback', false)}
                                                                    checked={!values.disable_rollback}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col bsPrefix="col-12">
                                                            <ButtonGroup aria-label="stack-form">
                                                                <Button type="submit">Submit</Button>
                                                                <Button type="button" variant="success" onClick={() => validateTemplate(values.code)} disabled={!validateButton}>Validate</Button>
                                                            </ButtonGroup>
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

export default EditStackPage;