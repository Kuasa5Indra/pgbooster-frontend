import Head from "next/head";
import AdminLayout from "../../../components/layouts/AdminLayout";
import { Section, SectionBody, SectionHeader } from "../../../components/bootstrap/Section";
import { Breadcrumb, BreadcrumbItem } from "../../../components/bootstrap/SectionBreadcrumb";
import { Button, Card, Col, Row, Form, FormControl } from "react-bootstrap";
import { useRouter } from "next/router";
import { Formik } from 'formik';
import api from "../../../utils/api";
import swal from "sweetalert";
import nookies from "nookies";
import * as Yup from 'yup';
import "yup-phone";

const schema = Yup.object().shape({
    name: Yup.string().required(),
    phone_number: Yup.string().phone("ID").required(),
    birthdate: Yup.date().required(),
    gender: Yup.string().oneOf(['male', 'female']).required(),
    email: Yup.string().email().required(),
});

const CreateUserPage = () => {
    const token = nookies.get().supertoken;
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Create User  &mdash; SuperAdmin</title>
            </Head>
            <AdminLayout>
                <Section>
                    <SectionHeader title="Create User">
                        <Breadcrumb>
                            <BreadcrumbItem href="/superadmin/users" text="Home" />
                            <BreadcrumbItem text="Amazon Cognito" />
                            <BreadcrumbItem text="User Management" />
                            <BreadcrumbItem text="Create User" active />
                        </Breadcrumb>
                    </SectionHeader>
                    <SectionBody>
                        <Row>
                            <Col sm={6} md={12} lg={12}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Create User</Card.Title>
                                        <Formik
                                            validationSchema={schema}
                                            validateOnChange={false}
                                            initialValues={{
                                                name: "",
                                                phone_number: "",
                                                birthdate: "",
                                                gender: "male",
                                                email: "",
                                            }}
                                            onSubmit={(values) => {
                                                const formData = new FormData();
                                                formData.append('name', values.name);
                                                formData.append('phone_number', values.phone_number);
                                                formData.append('birthdate', values.birthdate);
                                                formData.append('gender', values.gender);
                                                formData.append('email', values.email);
                                                api.post("/superadmin/users", formData, {headers: { "Authorization": "Bearer " + token}})
                                                    .then((response) => {
                                                        swal({
                                                            title: response.data.status,
                                                            text: response.data.message,
                                                            icon: "success",
                                                        }).then(function () {
                                                            router.push('/superadmin/users');
                                                        })
                                                    })
                                                    .catch((error) => {
                                                        console.log(error)
                                                        var errorData = error.response.data;
                                                        if(errorData.message == 'UsernameExistsException'){
                                                            swal({
                                                                title: errorData.status,
                                                                text: 'Email is alerady exists',
                                                                icon: "error",
                                                            })
                                                        }
                                                        // console.error("Error on", error.response.headers);
                                                        // console.log(error.response.data);
                                                        // console.log(error.response.status);
                                                    });
                                            }}
                                        >
                                            {({ handleSubmit, handleChange, values, errors, setFieldValue }) => (
                                                <Form onSubmit={handleSubmit} encType="multipart/form-data">
                                                    <Row className="g-3">
                                                        <Col sm={12} md={6} lg={6}>
                                                            <Form.Group>
                                                                <Form.Label>Name</Form.Label>
                                                                <Form.Control
                                                                    name="name"
                                                                    value={values.name}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!errors.name}
                                                                />
                                                                <FormControl.Feedback type="invalid">{errors.name}</FormControl.Feedback>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col sm={12} md={6} lg={6}>
                                                            <Form.Group>
                                                                <Form.Label>Birthdate</Form.Label>
                                                                <Form.Control
                                                                    type="date"
                                                                    name="birthdate"
                                                                    value={values.birthdate}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!errors.birthdate}
                                                                />
                                                                <FormControl.Feedback type="invalid">{errors.birthdate}</FormControl.Feedback>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col sm={12} md={6} lg={6}>
                                                            <Form.Group>
                                                                <Form.Label>Phone Number</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name="phone_number"
                                                                    placeholder="ex +62831234456"
                                                                    value={values.phone_number}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!errors.phone_number}
                                                                />
                                                                <FormControl.Feedback type="invalid">{errors.phone_number}</FormControl.Feedback>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col sm={12} md={6} lg={6}>
                                                            <Form.Group>
                                                                <Form.Label>Email</Form.Label>
                                                                <Form.Control
                                                                    type="email"
                                                                    name="email"
                                                                    value={values.email}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!errors.email}
                                                                />
                                                                <FormControl.Feedback type="invalid">{errors.email}</FormControl.Feedback>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col sm={12} md={6} lg={6}>
                                                            <Form.Group>
                                                                <Form.Label>Gender</Form.Label>
                                                                <Form.Check
                                                                    type="radio"
                                                                    label="Male"
                                                                    name="gender"
                                                                    value="male"
                                                                    id="male-radio"
                                                                    onChange={handleChange}
                                                                    defaultChecked
                                                                />
                                                                <Form.Check
                                                                    type="radio"
                                                                    label="Female"
                                                                    name="gender"
                                                                    value="female"
                                                                    onChange={handleChange}
                                                                    id="female-radio"
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
            </AdminLayout>
        </>
    );
}

export default CreateUserPage;