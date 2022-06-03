import dateFormat from "dateformat";
import {useRouter} from "next/router";
import useSWR from "swr";
import api from "../../../utils/api";
import { Spinner } from "react-bootstrap";

const fetcher = url => api.get(url).then(res => res.data.data)

const Overview = () => {
    const router = useRouter();
    const { name } = router.query;
    const { data, error } = useSWR(name ? `/stacks/describe/${name}` : null, fetcher);

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
            <b>Stack Id</b> <p>{data[0].StackId}</p>
            <b>Stack Name</b> <p>{data[0].StackName}</p>
            <b>Stack Creation</b> <p>{dateFormat(data[0].CreationTime, "dd/mm/yyyy HH:MM:ss")}</p>
            <b>Stack Status</b> <p>{data[0].StackStatus}</p>
            <b>Disable Rollback</b>
            <p>{data[0].DisableRollback ? "true" : "false"}</p>
            <b>Enable Termination Protection</b>
            <p>{data[0].EnableTerminationProtection ? "true" : "false"}</p>
        </>
    );
};

export default Overview;
