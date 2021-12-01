import Head from 'next/head';
import Image from 'next/image';
import { Row, Col, Card, Form, Container, Button } from 'react-bootstrap';

const RegisterPage = () => {
    return (
        <>
            <Head>
                <title>Register &mdash; PgBooster</title>
            </Head>
            <section className="section">
                <Container className="mt-5">
                    <Row>
                        <Col sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }} lg={{ span: 8, offset: 2 }} xl={{ span: 8, offset: 2 }} className="col-12">
                            <div class="login-brand">
                                <Image src="/assets/img/stisla-fill.svg" alt="logo" width={100} height={100} className="shadow-light rounded-circle" />
                            </div>

                            <Card className="card-primary">
                                <Card.Header><h4>Register</h4></Card.Header>
                                <Card.Body>
                                    <Form>
                                        <Row>
                                            <Form.Group className="col-6">
                                                <Form.Label>First Name</Form.Label>
                                                <Form.Control type="text" name="first_name" />
                                            </Form.Group>
                                            <Form.Group className="col-6">
                                                <Form.Label>Last Name</Form.Label>
                                                <Form.Control type="text" name="last_name" />
                                            </Form.Group>
                                        </Row>
                                        <Form.Group>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" name="email" />
                                        </Form.Group>
                                        <Row>
                                            <Form.Group className="col-6">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="password" name="password" />
                                            </Form.Group>
                                            <Form.Group className="col-6">
                                                <Form.Label>Password Confirmation</Form.Label>
                                                <Form.Control type="password" name="password-confirm" />
                                            </Form.Group>
                                        </Row>
                                        <Form.Group>
                                            <Form.Check
                                                custom
                                                type="checkbox"
                                                id="custom-checkbox"
                                                label="I agree with the terms and conditions"
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Button type="submit" size="lg" block>Register</Button>
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

export default RegisterPage;