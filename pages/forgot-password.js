import Head from 'next/head';
import Image from 'next/image';
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
            <section className="section">
                <Container className="mt-5">
                    <Row>
                        <Col sm={{ span: 8, offset: 2 }} md={{ span: 6, offset: 3 }} lg={{ span: 6, offset: 3 }} xl={{ span: 4, offset: 4 }} className="col-12">
                            <div className="login-brand">
                                <Image src="/assets/img/pgbooster.png" alt="logo" width={100} height={100} className="shadow-light rounded-circle" />
                            </div>

                            <Card className="card-primary">
                                <Card.Header><h4>Forgot Password</h4></Card.Header>
                                <Card.Body>
                                    <p className="text-muted">We will send a link to reset your password</p>
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
                                                    <Button type="submit" size="lg" block>Forgot Password</Button>
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

export default ForgotPasswordPage;