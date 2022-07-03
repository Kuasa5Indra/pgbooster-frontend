import {useRouter} from "next/router";
import useSWR from "swr";
import {Spinner, Row, Col} from "react-bootstrap";
import api from "../../../utils/api";
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import "prismjs/components/prism-json";
import "prismjs/components/prism-yaml";
import "prismjs/themes/prism-solarizedlight.css";

const fetcher = url => api.get(url).then(res => res.data.data)

const Templates = () => {
    const router = useRouter();
    const { name } = router.query;
    const { data, error } = useSWR(name ? `/stacks/describe/${name}/template` : null, fetcher);

    if(!data){
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
            <Row>
                <Col lg={12}>
                    <Editor
                        value={data}
                        highlight={data => highlight(data, languages.yaml)}
                        padding={10}
                        style={{
                            fontFamily: '"Fira code", "Fira Mono", monospace',
                            fontSize: 12,
                        }}
                    />
                </Col>
            </Row>
        </>
    );
};

export default Templates;
