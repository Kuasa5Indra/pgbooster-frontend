import {Spinner, Row, Col, Table} from "react-bootstrap";
import dateFormat from "dateformat";
import {useRouter} from "next/router";
import nookies from "nookies";
import useSWR from "swr";
import api from "../../../utils/api";

const fetcher = url => api.get(url, {headers: { "Authorization": "Bearer " + nookies.get().token}}).then(res => res.data.data)

const Events = () => {
    const router = useRouter();
    const { id } = router.query;
    const { data, error } = useSWR(id ? `/databases/${id}/events` : null, fetcher);

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
                    <th scope="col">Date</th>
                    <th scope="col">Message</th>
                </tr>
                </thead>
                <tbody>
                {data.map((events, index) => {
                    return (
                        <tr key={index}>
                            <td>{dateFormat(events.Date, "dd/mm/yyyy HH:MM:ss")}</td>
                            <td>{events.Message}</td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
        </>
    );
}
 
export default Events;