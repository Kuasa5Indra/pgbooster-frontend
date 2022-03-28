import { Form, Row, Col, Button, FormControl, Spinner } from "react-bootstrap";
import { AWSCredentialsAlert } from "../../interface";
import swal from "sweetalert";
import api from "../../../utils/api";
import useSWR from "swr";
import { Formik } from "formik";
import * as Yup from 'yup';
import nookies from "nookies";

const fetcher = url => api.get(url, { headers: { "Authorization": "Bearer " + nookies.get().token } }).then(res => res.data)

const schema = Yup.object().shape({
    config: Yup.mixed().required("File config is required"),
    credentials: Yup.mixed().required("File config is required"),
});

const UserCredentials = () => {
    const token = nookies.get().token;
    const { data, error } = useSWR('/auth/user/credentials', fetcher);

    if (!data) {
        return (
            <div className="text-center">
                <br />
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    return (
        <>
            <br />
            <AWSCredentialsAlert data={data} />
            <h5>Upload AWS Credentials</h5>
            <p>The shared credentials file on Linux, Unix, and macOS: ~/.aws/credentials</p>
            <p>The shared credentials file on Windows: C:\Users\USER_NAME\.aws\credentials</p>
            <p>Make sure to give Cloudformation Access, EC2 Access, and RDS Access on your IAM user account</p>
            <Formik
                validationSchema={schema}
                validateOnChange={false}
                initialValues={{
                    config: null,
                    credentials: null
                }}
                onSubmit={(values) => {
                    const formData = new FormData();
                    formData.append("config", values.config);
                    formData.append("credentials", values.credentials);
                    api.post('/auth/user/credentials', formData, {headers: { "Authorization": "Bearer " + token}})
                        .then((response) => {
                            swal({
                                title: response.data.status,
                                text: response.data.message,
                                icon: "success",
                            })
                        })
                        .catch((error) => {
                            var errorData = error.response.data.errors;
                            var errorMsg = errorData.map((error) => error.msg).toString()
                            swal({
                                title: "Something wrong",
                                text: errorMsg,
                                icon: "error",
                            })
                        })
                }}
            >
                {({ handleSubmit, values, errors, setFieldValue }) => (
                    <Form onSubmit={handleSubmit} encType="multipart/form-data">
                        <Row className="g-3">
                            <Col sm={12} md={6} lg={6}>
                                <Form.Group>
                                    <Form.Label>File config</Form.Label>
                                    <Form.Control
                                        name="config"
                                        type="file"
                                        onChange={(e) => setFieldValue('config', e.target.files[0])}
                                        isInvalid={!!errors.config}
                                    />
                                    <FormControl.Feedback type="invalid">{errors.config}</FormControl.Feedback>
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <Form.Group>
                                    <Form.Label>File credentials</Form.Label>
                                    <Form.Control
                                        name="credentials"
                                        type="file"
                                        onChange={(e) => setFieldValue('credentials', e.target.files[0])}
                                        isInvalid={!!errors.credentials}
                                    />
                                    <FormControl.Feedback type="invalid">{errors.credentials}</FormControl.Feedback>
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
}

export default UserCredentials;