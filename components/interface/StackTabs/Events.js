import dateFormat from "dateformat";
import { useRouter } from "next/router";
import useSWR from "swr";
import api from "../../../utils/api";
import { Spinner, Table, Button } from "react-bootstrap";
import { useState } from "react";

const fetcher = (url, nextToken) => api.get(url, {headers: {"next-token": nextToken}}).then(res => res.data.data)

const Events = () => {
    const router = useRouter();
    const { name } = router.query;
    const [isLoading, setLoading] = useState(false);
    const [nextToken, setNextToken] = useState(null);
    const { data, error } = useSWR(name ? [`/stacks/describe/${name}/events`, nextToken] : null, fetcher);

    const pageHandler = (token) => {
        setLoading(true);
        setNextToken(token);
        setLoading(false);
    }

    // if (!data) {
    //     return (
    //         <div className="text-center">
    //             <br />
    //             <Spinner animation="border" variant="primary" />
    //         </div>
    //     );
    // }

    return (
        <>
            <br />
            <Table responsive="lg" bordered>
                <thead>
                    <tr>
                        <th scope="col">Timestamp</th>
                        <th scope="col">Logical ID</th>
                        <th scope="col">Physical ID</th>
                        <th scope="col">Type</th>
                        <th scope="col">Status</th>
                        <th scope="col">Status Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.StackEvents.map((events, index) => {
                        return (
                            <tr key={index}>
                                <td>{dateFormat(events.Timestamp, "dd/mm/yyyy HH:MM:ss")}</td>
                                <td>{events.LogicalResourceId}</td>
                                <td>{events.PhysicalResourceId ? events.PhysicalResourceId : "-"}</td>
                                <td>{events.ResourceType}</td>
                                <td>{events.ResourceStatus}</td>
                                <td>{events.ResourceStatusReason ? events.ResourceStatusReason : "-"}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            {data?.NextToken ? (
                <div className="d-grid gap-2">
                    <Button variant="primary" type="button" disabled={isLoading} onClick={() => pageHandler(data.NextToken)}>
                        {isLoading ? 'Loading' : 'Next Page'}
                    </Button>
                </div>
            ) : (
                <div className="d-grid gap-2">
                    <Button variant="primary" type="button" disabled={isLoading} onClick={() => pageHandler(null)}>
                        {isLoading ? 'Loading' : 'Go Back'}
                    </Button>
                </div>
            )}
        </>
    );
};

export default Events;
