import Head from 'next/head';
import Image from 'next/image';
import Link from "next/link";
import {Row, Col, Card, Form, Container, Button, FormControl} from 'react-bootstrap';
import {Formik} from "formik";
import * as Yup from 'yup';
import api from "../utils/api";
import {useRouter} from "next/router";
import swal from "sweetalert";
import nookies from "nookies";

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
            <main>
                <Container>
                    <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                        <Container>
                            <Row className="justify-content-center">
                                <Col lg={4} md={6} className="d-flex flex-column align-items-center justify-content-center">
                                    <div className="d-flex justify-content-center py-4">
                                        <Link href="/">
                                            <a className="logo d-flex align-items-center w-auto">
                                                <Image src="/assets/img/pgbooster.png" alt="logo" width={100} height={100} />
                                                <span className="d-none d-lg-block">PgBooster</span>
                                            </a>
                                        </Link>
                                    </div>
                                    <Card className="mb-3">
                                        <Card.Body>
                                            <div className="pt-4 pb-2">
                                                <Card.Title className="text-center pb-0 fs-4">Reset your Password</Card.Title>
                                                <p className="text-center small">Set your new password</p>
                                            </div>
                                            <Formik
                                                validateOnChange={false}
                                                validationSchema={schema}
                                                initialValues={{
                                                    email: nookies.get().email,
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
                                                                nookies.destroy(null, 'email');
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
                                                        <Row className="g-3">
                                                            <Col bsPrefix="col-12">
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
                                                            <Col bsPrefix="col-12">
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
                                                            </Col>
                                                            <Col bsPrefix="col-12">
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
                                                            </Col>
                                                            <Col bsPrefix="col-12">
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
                                                            </Col>
                                                            <Col bsPrefix="col-12">
                                                                <Button type="submit" className="w-100">Reset Password</Button>
                                                            </Col>
                                                        </Row>
                                                    </Form>
                                                )}
                                            </Formik>
                                        </Card.Body>
                                    </Card>
                                    <div className="credits">
                                        Copyright &copy; PgBooster 2021 - {new Date().getFullYear()}
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                </Container>
            </main>
            <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short" /></a>
        </>
    );
}

export default ResetPasswordPage;