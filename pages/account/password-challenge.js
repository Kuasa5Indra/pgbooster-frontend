import Head from "next/head";
import {Button, Card, Col, Container, Form, FormControl, Row} from "react-bootstrap";
import Image from "next/image";
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
            <section className="section">
                <Container className="mt-5">
                    <Row>
                        <Col sm={{ span: 8, offset: 2 }} md={{ span: 6, offset: 3 }} lg={{ span: 6, offset: 3 }} xl={{ span: 4, offset: 4 }} className="col-12">
                            <div className="login-brand">
                                <Image src="/assets/img/pgbooster.png" alt="logo" width={100} height={100} className="shadow-light rounded-circle" />
                            </div>

                            <Card className="card-primary">
                                <Card.Header><h4>Password Challenge</h4></Card.Header>
                                <Card.Body>
                                    <p className="text-muted">We need you to change your password</p>
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
                                                        name="new_password"
                                                        value={values.new_password}
                                                        onChange={handleChange}
                                                        isInvalid={!!errors.new_password}
                                                    />
                                                    <FormControl.Feedback type="invalid">{errors.new_password}</FormControl.Feedback>
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
                                                    <Button type="submit" size="lg" block>Change Password</Button>
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

export default PasswordChallengePage;