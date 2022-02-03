import dateFormat from "dateformat";
import {useRouter} from "next/router";
import nookies from "nookies";
import useSWR from "swr";
import api from "../../../utils/api";
import { Spinner, Table } from "react-bootstrap";

const fetcher = url => api.get(url, {headers: { "Authorization": "Bearer " + nookies.get().token}}).then(res => res.data.data)

const Resources = () => {
    const router = useRouter();
    const { name } = router.query;
    const token = nookies.get().token;
    const { data, error } = useSWR(name ? `/stacks/describe/${name}/resources` : null, fetcher);

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
                    <th scope="col">Logical ID</th>
                    <th scope="col">Physical ID</th>
                    <th scope="col">Type</th>
                    <th scope="col">Last Update</th>
                    <th scope="col">Status</th>
                    <th scope="col">Status Reason</th>
                </tr>
                </thead>
                <tbody>
                {data.map((resource, index) => {
                    return (
                        <tr key={index}>
                            <td>{resource.LogicalResourceId}</td>
                            <td>{resource.PhysicalResourceId}</td>
                            <td>{resource.ResourceType}</td>
                            <td>{dateFormat(resource.LastUpdatedTimestamp, "dd/mm/yyyy HH:MM:ss")}</td>
                            <td>{resource.ResourceStatus}</td>
                            <td>{resource.ResourceStatusReason ? resource.ResourceStatusReason : "-"}</td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
        </>
    );
};

export default Resources;
