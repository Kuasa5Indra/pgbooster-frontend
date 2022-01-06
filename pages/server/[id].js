import Head from "next/head";
import { useRouter } from 'next/router';
import Layout from "../../components/layouts/Layout";
import api from "../../utils/api";
import dateFormat from "dateformat";
import { Section, SectionHeader, SectionBody } from "../../components/bootstrap/Section";
import { BreadcrumbHeader, BreadcrumbItem } from "../../components/bootstrap/SectionBreadcrumb";
import { Card, Row, Col, Spinner } from "react-bootstrap";
import nookies from "nookies";
import useSWR from "swr";

const fetcher = url => api.get(url, {headers: { "Authorization": "Bearer " + nookies.get().token}}).then(res => res.data.data)

const ShowInstancePage = () => {
    const router = useRouter();
    const { id } = router.query;

    const { data, error } = useSWR(id ? `/instances/${id}` : null, fetcher);

    return ( 
        <>
            <Head>
                <title>Detail Instance &mdash; PgBooster</title>
            </Head>
            <Layout>
            <Section>
                    <SectionHeader title="Detail Instance">
                        <BreadcrumbHeader>
                            <BreadcrumbItem href="/dashboard" text="Dashboard" active />
                            <BreadcrumbItem href="/server" text="Server" active />
                            <BreadcrumbItem text="Detail Instance" />
                        </BreadcrumbHeader>
                    </SectionHeader>
                    <SectionBody title={id}>
                        <Row>
                            <Col sm={6} md={12} lg={12}>
                                <Card>
                                    <Card.Header><h4>Instance Information</h4></Card.Header>
                                    <Card.Body>
                                        {!data ? (
                                            <div className="text-center">
                                                <Spinner animation="border" variant="primary" />
                                            </div>
                                        ) : (
                                            <Row>
                                                <Col sm={12} md={6} lg={6}>
                                                    <b>Instance Id</b>
                                                    <p>{data[0].Instances[0].InstanceId}</p>
                                                </Col>
                                                <Col sm={12} md={6} lg={6}>
                                                    <b>Instance Type</b>
                                                    <p>{data[0].Instances[0].InstanceType}</p>
                                                </Col>
                                                <Col sm={12} md={6} lg={6}>
                                                    <b>LaunchTime</b>
                                                    <p>{dateFormat(data[0].Instances[0].LaunchTime, "dd/mm/yyyy HH:MM:ss")}</p>
                                                </Col>
                                                <Col sm={12} md={6} lg={6}>
                                                    <b>Availability Zone</b>
                                                    <p>{data[0].Instances[0].Placement.AvailabilityZone}</p>
                                                </Col>
                                                <Col sm={12} md={6} lg={6}>
                                                    <b>Private IP Address</b>
                                                    <p>{data[0].Instances[0].PrivateIpAddress}</p>
                                                </Col>
                                                <Col sm={12} md={6} lg={6}>
                                                    <b>Public IP Address</b>
                                                    <p>{data[0].Instances[0].PublicIpAddress}</p>
                                                </Col>
                                                <Col sm={12} md={6} lg={6}>
                                                    <b>Private DNS</b>
                                                    <p>{data[0].Instances[0].PrivateDnsName}</p>
                                                </Col>
                                                <Col sm={12} md={6} lg={6}>
                                                    <b>Public DNS</b>
                                                    <p>{data[0].Instances[0].PublicDnsName}</p>
                                                </Col>
                                                <Col sm={12} md={6} lg={6}>
                                                    <b>Subnet ID</b>
                                                    <p>{data[0].Instances[0].SubnetId}</p>
                                                </Col>
                                                <Col sm={12} md={6} lg={6}>
                                                    <b>VPC ID</b>
                                                    <p>{data[0].Instances[0].VpcId}</p>
                                                </Col>
                                                <Col sm={12} md={6} lg={6}>
                                                    <b>Architecture</b>
                                                    <p>{data[0].Instances[0].Architecture}</p>
                                                </Col>
                                                <Col sm={12} md={6} lg={6}>
                                                    <b>Platform Details</b>
                                                    <p>{data[0].Instances[0].PlatformDetails}</p>
                                                </Col>
                                            </Row>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </SectionBody>
                </Section>
            </Layout>
        </>
    );
}
 
export default ShowInstancePage;