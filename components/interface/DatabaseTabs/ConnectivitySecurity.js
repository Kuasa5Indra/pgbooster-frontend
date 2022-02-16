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
                    <h5>Endpoint & Port</h5>
                    <b>Endpoint Address</b> <p>{data[0].Endpoint.Address}</p>
                    <b>Port</b> <p>{data[0].Endpoint.Port}</p>
                </Col>
                <Col sm={12} lg={4}>
                    <h5>Networking</h5>
                    <b>Availability Zone</b> <p>{data[0].AvailabilityZone}</p>
                    <b>VPC</b> <p>{data[0].DBSubnetGroup.VpcId}</p>
                    <b>Subnet Group</b> <p>{data[0].DBSubnetGroup.DBSubnetGroupName}</p>
                    <b>Subnets</b> {data[0].DBSubnetGroup.Subnets.map((subnet) => <p>{subnet.SubnetIdentifier}</p>)}
                </Col>
                <Col sm={12} lg={4}>
                    <h5>Security</h5>
                    <b>VPC Security Group</b> {data[0].VpcSecurityGroups.map((vpcsg) => <p>{vpcsg.VpcSecurityGroupId} ({vpcsg.Status})</p>)}
                    <b>Public Access</b> <p>{data[0].PubliclyAccessible ? 'Yes' : 'No'}</p>
                    <b>Certificate Authority</b> <p>{data[0].CACertificateIdentifier}</p>
                </Col>
            </Row>
        </>
    );
};

export default ConnectivitySecurity;
