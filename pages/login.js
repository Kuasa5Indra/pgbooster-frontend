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
      <section className="section">
        <Container className="mt-5">
          <Row>
            <Col sm={{ span: 8, offset: 2 }} md={{ span: 6, offset: 3 }} lg={{ span: 6, offset: 3 }} xl={{ span: 4, offset: 4 }} className="col-12">
              <div className="login-brand">
                <Image src="/assets/img/pgbooster.png" alt="logo" width={100} height={100} className="shadow-light rounded-circle" />
              </div>

              <Card className="card-primary">
                <Card.Header><h4>Login</h4></Card.Header>
                <Card.Body>
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
                            <div className="d-block">
                              <Form.Label className="control-label">Password</Form.Label>
                              <div className="float-right">
                                <Link href="/forgot-password">
                                  <a className="text-small">
                                    Forgot Password?
                                  </a>
                                </Link>
                              </div>
                            </div>
                            <Form.Control
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                isInvalid={!!errors.password}
                            />
                            <FormControl.Feedback type="invalid">{errors.password}</FormControl.Feedback>
                          </Form.Group>
                          <Form.Group>
                            <Button type="submit" size="lg" block>Login</Button>
                          </Form.Group>
                        </Form>
                    )}
                  </Formik>
                </Card.Body>
              </Card>
              <div className="mt-5 text-muted text-center">
                  Don't have an account? <Link href="/register"><a>Create One</a></Link>
              </div>
              <div className="simple-footer">
                Copyright &copy; PgBooster 2021
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default LoginPage;
