import {Spinner, Row, Col} from "react-bootstrap";
import dateFormat from "dateformat";

const MaintenanceBackup = ({data}) => {
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
                <Col sm={12} md={6} lg={6}>
                    <h5>Maintenance</h5>
                    <b>Auto minor version upgrade</b> <p>{data[0].AutoMinorVersionUpgrade ? 'Enabled' : 'Disabled'}</p>
                    <b>Maintenance window</b> <p>{data[0].PreferredMaintenanceWindow}</p>
                </Col>
                <Col sm={12} md={6} lg={6}>
                    <h5>Backup</h5>
                    <b>Automated backups</b> <p>{data[0].BackupRetentionPeriod > 0 ? `Enabled (${data[0].BackupRetentionPeriod} ${data[0].BackupRetentionPeriod == 1 ? 'day' : 'days'})` : 'Disabled'}</p>
                    <b>Copy tags to snapshots</b> <p>{data[0].CopyTagsToSnapshot ? 'Enabled' : 'Disabled'}</p>
                    <b>Backup target</b> <p>{data[0].BackupTarget}</p>
                    <b>Latest restore time</b> <p>{dateFormat(data[0].LatestRestorableTime, "dd/mm/yyyy HH:MM:ss")}</p>
                    <b>Backup window</b> <p>{data[0].PreferredBackupWindow} UTC (GMT)</p>
                </Col>
            </Row>
        </>
    );
};

export default MaintenanceBackup;
