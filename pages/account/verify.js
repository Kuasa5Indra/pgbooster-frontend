import Head from "next/head";
import {Button, Card, Col, Container, Form, FormControl, Row} from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import {Formik} from "formik";
import api from "../../utils/api";
import {useRouter} from "next/router";
import swal from "sweetalert";
import * as Yup from "yup";
import nookies from "nookies";

const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    code: Yup.number().required()
});

const VerifyAccountPage = () => {
    const router = useRouter();

    const resendCode = (email) => {
        const formData = new FormData();
        formData.append('email', email);
        api.post('/auth/resend-code', formData)
            .then((response) => {
                swal({
                    title: response.data.status,
                    text: response.data.message,
                    icon: "success",
                })
            })
            .catch((error) => {
                swal({
                    title: "Something wrong",
                    text: "Make sure you fill an valid email",
                    icon: "error",
                })
            })
    }

    return (
        <>
            <Head>
                <title>Verify Account &mdash; PgBooster</title>
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
                                                <Card.Title className="text-center pb-0 fs-4">Verify Account</Card.Title>
                                            </div>
                                            <Formik
                                                validateOnChange={false}
                                                validationSchema={schema}
                                                initialValues={{
                                                    email: nookies.get().unverifiedEmail,
                                                    code: ""
                                                }}
                                                onSubmit={(values) => {
                                                    const formData = new FormData();
                                                    formData.append("email", values.email);
                                                    formData.append("code", values.code);
                                                    api.post('/auth/register/confirm', formData)
                                                        .then((response) => {
                                                            nookies.destroy(null, 'unverifiedEmail')
                                                            swal({
                                                                title: response.data.status,
                                                                text: response.data.message,
                                                                icon: "success",
                                                            }).then(function () {
                                                                router.push('/login');
                                                            })
                                                        })
                                                        .catch((error) => {
                                                            console.log(error.response.data);
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
                                                                <Button type="submit" className="w-100">Verify Account</Button>
                                                            </Col>
                                                            <Col bsPrefix="col-12">
                                                                <Button type="button" variant="outline-secondary" className="w-100" onClick={() => resendCode(values.email)}>Resend Code</Button>
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
};

export default VerifyAccountPage;