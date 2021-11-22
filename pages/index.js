import Head from 'next/head';
import Image from 'next/image';
import { Row, Col, Card, Form, Container, Button } from 'react-bootstrap';

export default function Home() {
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
                <Image src="/assets/img/stisla-fill.svg" alt="logo" width={100} height={100} className="shadow-light rounded-circle" />
              </div>

              <Card className="card-primary">
                <Card.Header><h4>Login</h4></Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                      />
                    </Form.Group>
                    <Form.Group>
                      <div className="d-block">
                        <Form.Label className="control-label">Password</Form.Label>
                        <div className="float-right">
                          <a href="auth-forgot-password.html" className="text-small">
                            Forgot Password?
                          </a>
                        </div>
                      </div>
                      <Form.Control
                        type="password"
                        name="password"
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Check
                        custom
                        type="checkbox"
                        label="Remember Me"
                      />
                    </Form.Group>
                    <Form.Group>
                      <Button type="submit" size="lg" block>Login</Button>
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
              <div className="mt-5 text-muted text-center">
                Don't have an account? <a href="auth-register.html">Create One</a>
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
