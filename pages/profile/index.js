import Head from "next/head";
import Layout from "../../components/layouts/Layout";
import {Section, SectionBody, SectionHeader} from "../../components/bootstrap/Section";
import {Breadcrumb, BreadcrumbItem} from "../../components/bootstrap/SectionBreadcrumb";
import {Button, Card, Col, Row, Tab, Table, Tabs} from "react-bootstrap";
import {Overview, ChangePassword} from "../../components/interface/ProfileTabs";
import dateFormat from "dateformat";

const ProfilePage = () => {
    return (
        <>
            <Head>
                <title>Profile  &mdash; PgBooster</title>
            </Head>
            <Layout>
                <Section>
                    <SectionHeader title="Profile">
                        <Breadcrumb>
                            <BreadcrumbItem href="/dashboard" text="Home" />
                            <BreadcrumbItem text="Profile" active />
                        </Breadcrumb>
                    </SectionHeader>
                    <SectionBody>
                        <Row>
                            <Col sm={6} md={12} lg={12}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Profile</Card.Title>
                                        <Tabs defaultActiveKey="overview" id="profile-info" className="nav-tabs-bordered d-flex">
                                            <Tab eventKey="overview" title="Overview">
                                                <Overview />
                                            </Tab>
                                            <Tab eventKey="change-password" title="Change Password">
                                                <ChangePassword />
                                            </Tab>
                                        </Tabs>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </SectionBody>
                </Section>
            </Layout>
        </>
    );
};

export default ProfilePage;
