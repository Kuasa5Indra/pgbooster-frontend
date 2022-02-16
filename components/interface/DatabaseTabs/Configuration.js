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
                    <b>DB Instance ID</b> <p>{data[0].DBInstanceIdentifier}</p>
                    <b>Engine Version</b> <p>{data[0].EngineVersion}</p>
                    <b>DB Name</b> <p>{data[0].DBName}</p>
                    <b>License</b> <p>{data[0].LicenseModel}</p>
                    <b>Resource ID</b><p>{data[0].DbiResourceId}</p>
                    <b>Created Time</b><p>{dateFormat(data[0].InstanceCreateTime, "dd/mm/yyyy HH:MM:ss")}</p>
                </Col>
                <Col sm={12} md={6} lg={3}>
                    <h5>Instance Class</h5>
                    <b>Instance class</b> <p>{data[0].DBInstanceClass}</p>
                    <h5>Availability</h5>
                    <b>Master username</b> <p>{data[0].MasterUsername}</p>
                    <b>Multi-AZ</b> <p>{data[0].MultiAZ ? 'Yes' : 'No'}</p>
                    <b>Secondary Zone</b><p>{data[0].SecondaryAvailabilityZone ? data[0].SecondaryAvailabilityZone : '-'}</p>
                </Col>
                <Col sm={12} md={6} lg={3}>
                    <h5>Storage</h5>
                    <b>Encryption</b> <p>{data[0].StorageEncrypted ? 'enabled' : 'disabled'}</p>
                    <b>Storage Type</b> <p>{data[0].StorageType}</p>
                    <b>Storage</b> <p>{data[0].AllocatedStorage} GiB</p>
                    <b>Maximum Storage threshold</b> <p>{data[0].MaxAllocatedStorage} GiB</p>
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
