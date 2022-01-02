import Head from 'next/head';
import Image from 'next/image';
import {Row, Col, Card, Form, Container, Button, FormControl} from 'react-bootstrap';
import {Formik} from "formik";
import * as Yup from 'yup';
import api from "../utils/api";
import {useRouter} from "next/router";
import swal from "sweetalert";

const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required().min(8).matches(/^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/
        , "Password contains uppercase, lowercase, and number"),
    confirm_password: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required(),
    code: Yup.number().required()
});

const ResetPasswordPage = () => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Reset Password &mdash; PgBooster</title>
            </Head>
            <section className="section">
                <Container className="mt-5">
                    <Row>
                        <Col sm={{ span: 8, offset: 2 }} md={{ span: 6, offset: 3 }} lg={{ span: 6, offset: 3 }} xl={{ span: 4, offset: 4 }} className="col-12">
                            <div className="login-brand">
                                <Image src="/assets/img/stisla-fill.svg" alt="logo" width={100} height={100} className="shadow-light rounded-circle" />
                            </div>

                            <Card className="card-primary">
                                <Card.Header><h4>Reset Password</h4></Card.Header>
                                <Card.Body>
                                    <Formik
                                        validateOnChange={false}
                                        validationSchema={schema}
                                        initialValues={{
                                            email: "",
                                            password: "",
                                            confirm_password: "",
                                            code: ""
                                        }}
                                        onSubmit={(values) => {
                                            const formData = new FormData();
                                            formData.append("email", values.email);
                                            formData.append("password", values.password);
                                            formData.append("code", values.code);
                                            api.post('/auth/reset-password', formData)
                                                .then((response) => {
                                                    swal({
                                                        title: response.data.status,
                                                        text: response.data.message,
                                                        icon: "success",
                                                    }).then(function () {
                                                        router.push('/login');
                                                    })
                                                })
                                                .catch((error) => {
                                                    const errorResponse = error.response.data;
                                                    if(errorResponse.message == "CodeMismatchException"){
                                                        swal({
                                                            title: "Something wrong",
                                                            text: "Your code is invalid",
                                                            icon: "error",
                                                        })
                                                    }
                                                })
                                        }}
                                    >
                                        {({handleSubmit, handleChange, values, errors}) => (
                                            <Form onSubmit={handleSubmit}>
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
                                                <Form.Group>
                                                    <Form.Label>New Password</Form.Label>
                                                    <Form.Control
                                                        type="password"
                                                        name="password"
                                                        value={values.password}
                                                        onChange={handleChange}
                                                        isInvalid={!!errors.password}
                                                    />
                                                    <FormControl.Feedback type="invalid">{errors.password}</FormControl.Feedback>
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Confirm Password</Form.Label>
                                                    <Form.Control
                                                        type="password"
                                                        name="confirm_password"
                                                        value={values.confirm_password}
                                                        onChange={handleChange}
                                                        isInvalid={!!errors.confirm_password}
                                                    />
                                                    <FormControl.Feedback type="invalid">{errors.confirm_password}</FormControl.Feedback>
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Code</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="code"
                                                        value={values.code}
                                                        onChange={handleChange}
                                                        isInvalid={!!errors.code}
                                                    />
                                                    <FormControl.Feedback type="invalid">{errors.code}</FormControl.Feedback>
                                                </Form.Group>
                                                <Form.Group>
                                                    <Button type="submit" size="lg" block>Reset Password</Button>
                                                </Form.Group>
                                            </Form>
                                        )}
                                    </Formik>
                                </Card.Body>
                            </Card>
                            <div className="simple-footer">
                                Copyright &copy; PgBooster 2021
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default ResetPasswordPage;