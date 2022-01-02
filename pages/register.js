import Head from 'next/head';
import Image from 'next/image';
import {Row, Col, Card, Form, Container, Button, FormControl} from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import "yup-phone";
import api from "../utils/api";
import swal from "sweetalert";
import {useRouter} from "next/router";

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
            <section className="section">
                <Container className="mt-5">
                    <Row>
                        <Col sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }} lg={{ span: 8, offset: 2 }} xl={{ span: 8, offset: 2 }} className="col-12">
                            <div className="login-brand">
                                <Image src="/assets/img/stisla-fill.svg" alt="logo" width={100} height={100} className="shadow-light rounded-circle" />
                            </div>

                            <Card className="card-primary">
                                <Card.Header><h4>Register</h4></Card.Header>
                                <Card.Body>
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
                                                <Row>
                                                    <Form.Group className="col-6">
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
                                                    <Form.Group className="col-6">
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
                                                </Row>
                                                <Row>
                                                    <Form.Group className="col-6">
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
                                                    <Form.Group className="col-6">
                                                        <Form.Label>Gender</Form.Label>
                                                        <Form.Check
                                                            custom
                                                            type="radio"
                                                            label="Male"
                                                            name="gender"
                                                            value="male"
                                                            id="male-radio"
                                                            onChange={handleChange}
                                                            defaultChecked
                                                        />
                                                        <Form.Check
                                                            custom
                                                            type="radio"
                                                            label="Female"
                                                            name="gender"
                                                            value="female"
                                                            id="female-radio"
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>
                                                </Row>
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
                                                <Row>
                                                    <Form.Group className="col-6">
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
                                                    <Form.Group className="col-6">
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
                                                </Row>
                                                <Form.Group>
                                                    <Form.Check
                                                        custom
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
                                                <Form.Group>
                                                    <Button type="submit" size="lg" block>Register</Button>
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

export default RegisterPage;