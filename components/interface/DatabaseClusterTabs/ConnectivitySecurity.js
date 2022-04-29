import {Spinner, Row, Col} from "react-bootstrap";

const ConnectivitySecurity = ({data}) => {
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
                <Col sm={12} lg={4}>
                    <h5>Endpoint</h5>
                    <b>Writer Endpoint</b> <p>{data[0].Endpoint}</p>
                    <b>Reader Endpoint</b><p>{data[0].ReaderEndpoint}</p>
                    <b>Port</b><p>{data[0].Port}</p>
                </Col>
                <Col sm={12} lg={4}>
                    <h5>Networking</h5>
                    <b>Availability Zone</b> <p>{data[0].AvailabilityZones.join(", ")}</p>
                    <b>Subnet Group</b> <p>{data[0].DBSubnetGroup}</p>
                </Col>
                <Col sm={12} lg={4}>
                    <h5>Security</h5>
                    <b>VPC Security Group</b> {data[0].VpcSecurityGroups.map((vpcsg) => <p>{vpcsg.VpcSecurityGroupId} ({vpcsg.Status})</p>)}
                    <h5>Database Cluster Members</h5>
                    {data[0].DBClusterMembers.map((member) => {
                        return (
                            <>
                                <b>{member.IsClusterWriter ? 'Writer Instance' : 'Reader Instance'}</b>
                                <p>{member.DBInstanceIdentifier} ({member.DBClusterParameterGroupStatus}) </p>
                            </>
                        );
                    })}
                </Col>
            </Row>
        </>
    );
};

export default ConnectivitySecurity;
