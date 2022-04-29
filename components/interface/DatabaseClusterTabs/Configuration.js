import dateFormat from "dateformat";
import {Col, Row, Spinner} from "react-bootstrap";

const Configuration = ({data}) => {

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
                <Col sm={12} md={6} lg={3}>
                    <h5>Configuration</h5>
                    <b>DB Cluster ID</b> <p>{data[0].DBClusterIdentifier}</p>
                    <b>DB Name</b> <p>{data[0].DatabaseName}</p>
                    <b>Engine Version</b> <p>{data[0].EngineVersion}</p>
                    <b>Engine Mode</b> <p>{data[0].EngineMode}</p>
                    <b>Resource ID</b><p>{data[0].DbClusterResourceId}</p>
                    <b>Created Time</b><p>{dateFormat(data[0].ClusterCreateTime, "dd/mm/yyyy HH:MM:ss")}</p>
                </Col>
                <Col sm={12} md={6} lg={3}>
                    <h5>Authentication</h5>
                    <b>Master username</b> <p>{data[0].MasterUsername}</p>
                    <h5>Availability</h5>
                    <b>Multi-AZ</b> <p>{data[0].MultiAZ ? 'Yes' : 'No'}</p>
                    <b>Failover Priority</b>
                    {data[0].DBClusterMembers.map((member) => {
                        return (
                            <p>{member.DBInstanceIdentifier} : {member.PromotionTier}</p>
                        );
                    })}
                </Col>
                <Col sm={12} md={6} lg={3}>
                    <h5>Storage</h5>
                    <b>Encryption</b> <p>{data[0].StorageEncrypted ? 'enabled' : 'disabled'}</p>
                    <b>Storage</b> <p>{data[0].AllocatedStorage} GiB</p>
                </Col>
                <Col sm={12} md={6} lg={3}>
                    <h5>Performance Insights</h5>
                    <b>Performance Insights enabled</b> <p>{data[0].PerformanceInsightsEnabled ? 'Yes' : 'No'}</p>
                    <h5>Database Activity Stream</h5>
                    <b>Status</b> <p>{data[0].ActivityStreamStatus}</p>
                </Col>
            </Row>
        </>
    );
};

export default Configuration;
