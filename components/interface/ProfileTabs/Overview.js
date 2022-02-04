import dateFormat from "dateformat";
import nookies from "nookies";
import useSWR from "swr";
import api from "../../../utils/api";
import { Spinner } from "react-bootstrap";

const fetcher = url => api.get(url, {headers: { "Authorization": "Bearer " + nookies.get().token}}).then(res => res.data.data)

const Overview = () => {
    const {token} = nookies.get();
    const { data, error } = useSWR('/auth/user', fetcher);

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
            <b>Name</b> <p>{data.find(x => x.Name === 'name').Value}</p>
            <b>Gender</b> <p>{data.find(x => x.Name === 'gender').Value}</p>
            <b>Email</b> <p>{data.find(x => x.Name === 'email').Value}</p>
            <b>Phone Number</b> <p>{data.find(x => x.Name === 'phone_number').Value}</p>
            <b>Birthdate</b> <p>{dateFormat(data.find(x => x.Name === 'birthdate').Value, "dd/mm/yyyy")}</p>
        </>
    );
};

export default Overview;
