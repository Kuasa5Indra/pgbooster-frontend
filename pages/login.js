import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {Row, Col, Card, Form, Container, Button, FormControl} from 'react-bootstrap';
import api from '../utils/api';
import swal from "sweetalert";
import { Formik } from 'formik';
import * as Yup from 'yup';
import nookies from 'nookies';
import {useRouter} from "next/router";

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(8)
});

const LoginPage = () => {
  const router = useRouter();

  return (
      <>
          <Head>
              <title>Login &mdash; PgBooster</title>
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
                                              <Card.Title className="text-center pb-0 fs-4">Login to Your Account</Card.Title>
                                              <p className="text-center small">Enter your email &amp; password to login</p>
                                          </div>
                                          <Formik
                                              validationSchema={schema}
                                              validateOnChange={false}
                                              initialValues={{
                                                  email: "",
                                                  password: ""
                                              }}
                                              onSubmit={(values) => {
                                                  const formData = new FormData();
                                                  formData.append("email", values.email);
                                                  formData.append("password", values.password);
                                                  api.post('/auth/login', formData)
                                                      .then((response) => {
                                                          const result = response.data.data;
                                                          if(result.AuthenticationResult){
                                                              const access_token = result.AuthenticationResult.AccessToken;
                                                              // const refresh_token = result.AuthenticationResult.RefreshToken;
                                                              nookies.set(null, 'token', access_token, { maxAge: result.AuthenticationResult.ExpiresIn, path: "/" });
                                                              // nookies.set(null, 'refresh_token', refresh_token, { maxAge: 864000, path: "/"});
                                                              router.push('/dashboard');
                                                          } else if (result.ChallengeName == "NEW_PASSWORD_REQUIRED") {
                                                              nookies.set(null, 'session', result.Session, { maxAge: 3600 });
                                                              router.push('/account/password-challenge');
                                                          }
                                                      })
                                                      .catch((error) => {
                                                          const errorResponse = error.response.data;
                                                          if(errorResponse.message == "NotAuthorizedException"){
                                                              swal({
                                                                  title: "Something wrong",
                                                                  text: "Incorrect email or password",
                                                                  icon: "error",
                                                              })
                                                          }
                                                          else if(errorResponse.message == "UserNotConfirmedException"){
                                                              nookies.set(null, 'unverifiedEmail', values.email, { maxAge: 3600 });
                                                              router.push('/account/verify');
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
                                                          <Col bsPrefix="col-12">
                                                              <p className="small mb-0">Dont have account ? <Link href="/register"><a>Create an account</a></Link></p>
                                                          </Col>
                                                          <Col bsPrefix="col-12">
                                                              <p className="small mb-0">Forgot Password ? <Link href="/forgot-password"><a>Reset here</a></Link></p>
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
