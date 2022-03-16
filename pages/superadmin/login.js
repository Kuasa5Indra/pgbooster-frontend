import Head from 'next/head';
import Link from 'next/link';
import { Row, Col, Card, Form, Container, Button, FormControl } from 'react-bootstrap';
import api from '../../utils/api';
import swal from "sweetalert";
import { Formik } from 'formik';
import * as Yup from 'yup';
import nookies from 'nookies';
import { useRouter } from "next/router";

const schema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required().min(8)
});

const LoginPage = () => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Login &mdash; SuperAdmin</title>
            </Head>
            <main>
                <Container>
                    <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                        <Container>
                            <Row className="justify-content-center">
                                <Col lg={4} md={6} className="d-flex flex-column align-items-center justify-content-center">
                                    <div className="d-flex justify-content-center py-4">
                                        <Link href="/superadmin/login">
                                            <a className="logo d-flex align-items-center w-auto">
                                                <span className="d-none d-lg-block">SuperAdmin</span>
                                            </a>
                                        </Link>
                                    </div>
                                    <Card className="mb-3">
                                        <Card.Body>
                                            <div className="pt-4 pb-2">
                                                <Card.Title className="text-center pb-0 fs-4">Login to Your Account</Card.Title>
                                                <p className="text-center small">Enter your username &amp; password to login</p>
                                            </div>
                                            <Formik
                                                validationSchema={schema}
                                                validateOnChange={false}
                                                initialValues={{
                                                    username: "",
                                                    password: ""
                                                }}
                                                onSubmit={(values) => {
                                                    const formData = new FormData();
                                                    formData.append("username", values.username);
                                                    formData.append("password", values.password);
                                                    api.post('/superadmin/login', formData)
                                                        .then((response) => {
                                                            var responseData = response.data.data;
                                                            var access_token = responseData.token;
                                                            nookies.set(null, 'supertoken', access_token, { maxAge: responseData.expire * 1000});
                                                            router.push('/superadmin/users');
                                                        })
                                                        .catch((error) => {
                                                            var errorData = error.response.data;
                                                            swal({
                                                                title: errorData.status,
                                                                text: errorData.message,
                                                                icon: "error",
                                                            })
                                                        })
                                                }}
                                            >
                                                {({ handleSubmit, handleChange, values, errors }) => (
                                                    <Form onSubmit={handleSubmit}>
                                                        <Row className="g-3">
                                                            <Col bsPrefix="col-12">
                                                                <Form.Group>
                                                                    <Form.Label>Username</Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        name="username"
                                                                        value={values.username}
                                                                        onChange={handleChange}
                                                                        isInvalid={!!errors.username}
                                                                    />
                                                                    <FormControl.Feedback type="invalid">{errors.username}</FormControl.Feedback>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col bsPrefix="col-12">
                                                                <Form.Group>
                                                                    <Form.Label>Password</Form.Label>
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
                                                                <Button type="submit" className="w-100">Login</Button>
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
    )
}

export default LoginPage;
