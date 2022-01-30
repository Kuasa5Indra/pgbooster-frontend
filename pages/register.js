import Head from 'next/head';
import Image from 'next/image';
import Link from "next/link";
import {Row, Col, Card, Form, Container, Button, FormControl} from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import "yup-phone";
import api from "../utils/api";
import swal from "sweetalert";
import {useRouter} from "next/router";
import nookies from "nookies";

const schema = Yup.object().shape({
    name: Yup.string().required(),
    phone_number: Yup.string().phone("ID").required(),
    birthdate: Yup.date().required(),
    gender: Yup.string().oneOf(['male', 'female']).required(),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(8).matches(/^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/
        , "Password contains uppercase, lowercase, and number"),
    confirm_password: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required(),
    terms: Yup.bool().required().oneOf([true], 'Terms must be accepted'),
});

const RegisterPage = () => {
    const router = useRouter();
    return (
        <>
            <Head>
                <title>Register &mdash; PgBooster</title>
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
                                                <Card.Title className="text-center pb-0 fs-4">Create an Account</Card.Title>
                                                <p className="text-center small">Enter your personal details to create account</p>
                                            </div>
                                            <Formik
                                                validateOnChange={false}
                                                validationSchema={schema}
                                                initialValues={{
                                                    name: "",
                                                    phone_number: "",
                                                    birthdate: "",
                                                    gender: "male",
                                                    email: "",
                                                    password: "",
                                                    confirm_password: "",
                                                    terms: false,
                                                }}
                                                onSubmit={(values) => {
                                                    const formData = new FormData();
                                                    formData.append('name', values.name);
                                                    formData.append('phone_number', values.phone_number);
                                                    formData.append('birthdate', values.birthdate);
                                                    formData.append('gender', values.gender);
                                                    formData.append('email', values.email);
                                                    formData.append('password', values.password);
                                                    api.post('/auth/register', formData)
                                                        .then((response) => {
                                                            swal({
                                                                title: response.data.status,
                                                                text: response.data.message,
                                                                icon: "success",
                                                            }).then(function () {
                                                                nookies.set(null, 'unverifiedEmail', values.email, { maxAge: 3600 });
                                                                router.push('/account/verify');
                                                            })
                                                        })
                                                        .catch((error) => {
                                                            const errorResponse = error.response.data;
                                                            if(errorResponse.message == "UsernameExistsException"){
                                                                swal({
                                                                    title: "Something wrong",
                                                                    text: "Email is alerady exists, Please choose another one",
                                                                    icon: "error",
                                                                })
                                                            }
                                                        })
                                                }}
                                            >
                                                {({handleSubmit, handleChange, values, errors, setFieldValue}) => (
                                                    <Form onSubmit={handleSubmit}>
                                                        <Row className="g-3">
                                                            <Col bsPrefix="col-12">
                                                                <Form.Group>
                                                                    <Form.Label>Name</Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        name="name"
                                                                        value={values.name}
                                                                        onChange={handleChange}
                                                                        isInvalid={!!errors.name}
                                                                    />
                                                                    <FormControl.Feedback type="invalid">{errors.name}</FormControl.Feedback>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col bsPrefix="col-12">
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
                                                            <Col bsPrefix="col-12">
                                                                <Form.Group>
                                                                    <Form.Label>Phone Number</Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        name="phone_number"
                                                                        value={values.phone_number}
                                                                        onChange={handleChange}
                                                                        isInvalid={!!errors.phone_number}
                                                                    />
                                                                    <FormControl.Feedback type="invalid">{errors.phone_number}</FormControl.Feedback>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col bsPrefix="col-12">
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
                                                                <Form.Group>
                                                                    <Form.Label>Password Confirmation</Form.Label>
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
                                                                    <Form.Check
                                                                        name="terms"
                                                                        type="checkbox"
                                                                        id="custom-checkbox"
                                                                        value={values.terms}
                                                                        onChange={handleChange}
                                                                        isInvalid={!!errors.terms}
                                                                        feedback={errors.terms}
                                                                        label="I agree with the terms and conditions"
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col bsPrefix="col-12">
                                                                <Button type="submit" className="w-100">Register</Button>
                                                            </Col>
                                                            <Col bsPrefix="col-12">
                                                                <p className="small mb-0">Already have an account? <Link href="/login"><a>Log in</a></Link></p>
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

export default RegisterPage;