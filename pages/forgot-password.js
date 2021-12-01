import Head from 'next/head';
import Image from 'next/image';
import { Row, Col, Card, Form, Container, Button } from 'react-bootstrap';

const ForgotPasswordPage = () => {
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
                                <Image src="/assets/img/stisla-fill.svg" alt="logo" width={100} height={100} className="shadow-light rounded-circle" />
                            </div>

                            <Card className="card-primary">
                                <Card.Header><h4>Forgot Password</h4></Card.Header>
                                <Card.Body>
                                    <p className="text-muted">We will send a link to reset your password</p>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Button type="submit" size="lg" block>Forgot Password</Button>
                                        </Form.Group>
                                    </Form>
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