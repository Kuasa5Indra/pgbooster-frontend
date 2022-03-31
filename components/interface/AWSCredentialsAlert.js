import { Alert } from "react-bootstrap";
import { useState } from "react";

const AWSCredentialsAlert = ({ data }) => {
    const [show, setShow] = useState(true);

    if(show){
        return (
            <Alert variant={data?.data.alert} onClose={() => setShow(false)} dismissible>
                <Alert.Heading>{data?.message}</Alert.Heading>
                {data?.data.alert_message}
            </Alert>
        );
    }
    return null;
}

export default AWSCredentialsAlert;