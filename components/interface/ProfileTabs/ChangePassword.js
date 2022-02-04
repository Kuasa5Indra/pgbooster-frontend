import {Form, Row, Col, Button, FormControl} from "react-bootstrap";
import swal from "sweetalert";
import api from "../../../utils/api";
import {Formik} from "formik";
import * as Yup from 'yup';
import nookies from "nookies";

const schema = Yup.object().shape({
    old_password: Yup.string().required().min(8).matches(/^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/
        , "Password contains uppercase, lowercase, and number"),
    new_password: Yup.string().required().min(8).matches(/^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/
        , "Password contains uppercase, lowercase, and number").notOneOf([Yup.ref('old_password'), null], 'Passwords cannot be same with old one'),
    confirm_password: Yup.string().oneOf([Yup.ref('new_password'), null], 'Passwords must match with new one').required()
});

const ChangePassword = () => {
    const token = nookies.get().token;
    return (
        <>
            <br />
            <Formik
                validateOnChange={false}
                validationSchema={schema}
                initialValues={{
                    old_password: "",
                    new_password: "",
                    confirm_password: ""
                }}
                onSubmit={(values) => {
                    const formData = new FormData();
                    formData.append("old_password", values.old_password);
                    formData.append("new_password", values.new_password);
                    api.post('/auth/change-password', formData, {headers: { "Authorization": "Bearer " + token}})
                        .then((response) => {
                            swal({
                                title: response.data.status,
                                text: response.data.message,
                                icon: "success",
                            })
                        })
                        .catch((error) => {
                            var errorData = error.response.data;
                            swal({
                                title: errorData.title,
                                text: errorData.message,
                                icon: "error",
                            })
                        })
                }}
            >
                {({handleSubmit, handleChange, values, errors}) => (
                    <Form onSubmit={handleSubmit}>
                        <Row className="g-3">
                            <Col bsPrefix="col-12">
                                <Form.Group>
                                    <Form.Label>Old Password</Form.Label>
                                    <Form.Control
                                        name="old_password"
                                        type="password"
                                        value={values.old_password}
                                        onChange={handleChange}
                                        isInvalid={!!errors.old_password}
                                    />
                                    <FormControl.Feedback type="invalid">{errors.old_password}</FormControl.Feedback>
                                </Form.Group>
                            </Col>
                            <Col bsPrefix="col-12">
                                <Form.Group>
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control
                                        name="new_password"
                                        type="password"
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
                                        name="confirm_password"
                                        type="password"
                                        value={values.confirm_password}
                                        onChange={handleChange}
                                        isInvalid={!!errors.confirm_password}
                                    />
                                    <FormControl.Feedback type="invalid">{errors.confirm_password}</FormControl.Feedback>
                                </Form.Group>
                            </Col>
                            <Col bsPrefix="col-12">
                                <Button type="submit">Submit</Button>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default ChangePassword;
