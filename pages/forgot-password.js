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
    email: Yup.string().email().required()
});

const ForgotPasswordPage = () => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Forgot Password &mdash; PgBooster</title>
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
                                                <Card.Title className="text-center pb-0 fs-4">Forgot your Password</Card.Title>
                                                <p className="text-center small">Lets reset your password using email</p>
                                            </div>
                                            <Formik
                                                validationSchema={schema}
                                                initialValues={{
                                                    email: ""
                                                }}
                                                onSubmit={(values) => {
                                                    const formData = new FormData();
                                                    formData.append("email", values.email);
                                                    api.post('/auth/forgot-password', formData)
                                                        .then((response) => {
                                                            swal({
                                                                title: response.data.status,
                                                                text: response.data.message,
                                                                icon: "success",
                                                            }).then(function () {
                                                                nookies.set(null, 'email', values.email);
                                                                router.push('/reset-password');
                                                            })
                                                        })
                                                        .catch((error) => {
                                                            console.log(error.response.data.message);
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
                                                                <Button type="submit" className="w-100">Forgot Password</Button>
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

export default ForgotPasswordPage;