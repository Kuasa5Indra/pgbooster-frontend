import Head from "next/head";
import {Button, Card, Col, Container, Form, FormControl, Row} from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import {Formik} from "formik";
import api from "../../utils/api";
import {useRouter} from "next/router";
import swal from "sweetalert";
import nookies from "nookies";
import * as Yup from "yup";

const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    new_password: Yup.string().required().min(8).matches(/^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/
        , "Password contains uppercase, lowercase, and number"),
    confirm_password: Yup.string().oneOf([Yup.ref('new_password'), null], 'Passwords must match').required(),
});

const PasswordChallengePage = () => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Password Challenge &mdash; PgBooster</title>
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
                                                <Card.Title className="text-center pb-0 fs-4">Password Challenge</Card.Title>
                                                <p className="text-center small">We need you to set new password</p>
                                            </div>
                                            <Formik
                                                validateOnChange={false}
                                                validationSchema={schema}
                                                initialValues={{
                                                    email: "",
                                                    new_password: "",
                                                    confirm_password: "",
                                                }}
                                                onSubmit={(values) => {
                                                    const formData = new FormData();
                                                    formData.append("email", values.email);
                                                    formData.append("new_password", values.new_password);
                                                    api.post('/auth/respond/new-password', formData, {
                                                        headers: {
                                                            session: nookies.get().session
                                                        }
                                                    })
                                                        .then((response) => {
                                                            nookies.destroy(null, 'session')
                                                            swal({
                                                                title: response.data.status,
                                                                text: response.data.message,
                                                                icon: "success",
                                                            }).then(function () {
                                                                const result = response.data.data;
                                                                if(result.AuthenticationResult){
                                                                    const access_token = result.AuthenticationResult.AccessToken;
                                                                    // const refresh_token = result.AuthenticationResult.RefreshToken;
                                                                    nookies.set(null, 'token', access_token, { maxAge: result.AuthenticationResult.ExpiresIn, path: "/" });
                                                                    // nookies.set(null, 'refresh_token', refresh_token, { maxAge: 864000, path: "/"});
                                                                    router.push('/dashboard');
                                                                }
                                                            })
                                                        })
                                                        .catch((error) => {
                                                            console.log(error);
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
                                                                        name="new_password"
                                                                        value={values.new_password}
                                                                        onChange={handleChange}
                                                                        isInvalid={!!errors.new_password}
                                                                    />
                                                                    <FormControl.Feedback type="invalid">{errors.new_password}</FormControl.Feedback>
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
                                                                <Button type="submit" className="w-100">Change Password</Button>
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

export default PasswordChallengePage;