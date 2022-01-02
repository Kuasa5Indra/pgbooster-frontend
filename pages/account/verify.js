import Head from "next/head";
import {Button, Card, Col, Container, Form, FormControl, Row} from "react-bootstrap";
import Image from "next/image";
import {Formik} from "formik";
import api from "../../utils/api";
import {useRouter} from "next/router";
import swal from "sweetalert";
import * as Yup from "yup";

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
            <section className="section">
                <Container className="mt-5">
                    <Row>
                        <Col sm={{ span: 8, offset: 2 }} md={{ span: 6, offset: 3 }} lg={{ span: 6, offset: 3 }} xl={{ span: 4, offset: 4 }} className="col-12">
                            <div className="login-brand">
                                <Image src="/assets/img/stisla-fill.svg" alt="logo" width={100} height={100} className="shadow-light rounded-circle" />
                            </div>

                            <Card className="card-primary">
                                <Card.Header><h4>Verify Account</h4></Card.Header>
                                <Card.Body>
                                    <p className="text-muted">We need you to confirm your email</p>
                                    <Formik
                                        validateOnChange={false}
                                        validationSchema={schema}
                                        initialValues={{
                                            email: "",
                                            code: ""
                                        }}
                                        onSubmit={(values) => {
                                            const formData = new FormData();
                                            formData.append("email", values.email);
                                            formData.append("code", values.code);
                                            api.post('/auth/register/confirm', formData)
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
                                                    <Button type="submit" size="lg" block>Verify Account</Button>
                                                    <Button type="button" size="lg" block variant="outline-secondary" onClick={() => resendCode(values.email)}>Resend Confirmation Code</Button>
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
};

export default VerifyAccountPage;