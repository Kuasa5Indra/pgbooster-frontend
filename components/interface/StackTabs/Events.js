import dateFormat from "dateformat";
import {useRouter} from "next/router";
import nookies from "nookies";
import useSWR from "swr";
import api from "../../../utils/api";
import {Spinner, Table} from "react-bootstrap";

const fetcher = url => api.get(url, {headers: { "Authorization": "Bearer " + nookies.get().token}}).then(res => res.data.data)

const Events = () => {
    const router = useRouter();
    const { name } = router.query;
    const token = nookies.get().token;
    const { data, error } = useSWR(name ? `/stacks/describe/${name}/events` : null, fetcher);

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
                {data.map((events, index) => {
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
        </>
    );
};

export default Events;
