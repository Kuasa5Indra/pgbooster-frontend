import {useRouter} from "next/router";
import nookies from "nookies";
import useSWR from "swr";
import {Spinner} from "react-bootstrap";
import api from "../../../utils/api";

const fetcher = url => api.get(url, {headers: { "Authorization": "Bearer " + nookies.get().token}}).then(res => res.data.data)

const Templates = () => {
    const router = useRouter();
    const { name } = router.query;
    const token = nookies.get().token;
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
            <textarea rows={50} cols={100} disabled>
                {data}
            </textarea>
        </>
    );
};

export default Templates;
