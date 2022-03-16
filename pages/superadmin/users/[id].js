import Head from "next/head";
import AdminLayout from "../../../components/layouts/AdminLayout";
import api from "../../../utils/api";
import { useRouter } from 'next/router';
import { Section, SectionHeader, SectionBody } from "../../../components/bootstrap/Section";
import { Breadcrumb, BreadcrumbItem } from "../../../components/bootstrap/SectionBreadcrumb";
import { Button, Card, Col, Row, ButtonGroup, Spinner } from "react-bootstrap";
import swal from "sweetalert";
import dateFormat from "dateformat";
import nookies from "nookies";
import useSWR from "swr";

const fetcher = url => api.get(url, {headers: { "Authorization": "Bearer " + nookies.get().supertoken}}).then(res => res.data.data)

const ShowUserPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const { data, error } = useSWR(id ? `/superadmin/users/${id}` : null, fetcher);

    const enableUser = async (sub) => {
        const res = await api.get("/superadmin/users/" + sub + "/enable", {headers: { "Authorization": "Bearer " + nookies.get().supertoken}})
        const user = await res.data
        swal({
            title: user.status,
            text: user.message,
            icon: "success",
        }).then(function () {
            router.reload('/superadmin/users');
        });
    }

    const disableUser = async (sub) => {
        swal({
            title: "Are you sure ?",
            text: "Once its disabled, the user cannot login to your application",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDisable) => {
                if (willDisable) {
                    const res = await api.get("/superadmin/users/" + sub + "/disable", {headers: { "Authorization": "Bearer " + nookies.get().supertoken}})
                    const user = await res.data
                    swal({
                        title: user.status,
                        text: user.message,
                        icon: "success",
                    }).then(function () {
                        router.reload('/superadmin/users');
                    });
                }
            });
    }

    const deleteUser = async (sub) => {
        swal({
            title: "Are you sure ?",
            text: "Once its deleted, you cannot undo your action",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    const res = await api.delete("/superadmin/users/" + sub, {headers: { "Authorization": "Bearer " + nookies.get().supertoken}})
                    const user = await res.data
                    swal({
                        title: user.status,
                        text: user.message,
                        icon: "success",
                    }).then(function () {
                        router.push('/superadmin/users');
                    });
                }
            });
    }

    return (
        <>
            <Head>
                <title>Detail User &mdash; SuperAdmin</title>
            </Head>
            <AdminLayout>
                <Section>
                    <SectionHeader title="Detail User">
                        <Breadcrumb>
                            <BreadcrumbItem href="/superadmin/users" text="Home" />
                            <BreadcrumbItem text="Amazon Cognito" />
                            <BreadcrumbItem text="User Management" />
                            <BreadcrumbItem text={id} active />
                        </Breadcrumb>
                    </SectionHeader>
                    <SectionBody>
                        <Row>
                            <Col sm={6} md={12} lg={12}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Detail User</Card.Title>
                                        {!data ? (
                                            <div className="text-center">
                                                <Spinner animation="border" variant="primary" />
                                            </div>
                                        ) : (
                                            <Row>
                                                <Col sm={12} md={6} lg={6}>
                                                    <b>Sub</b>
                                                    <p>{data.UserAttributes.find(x => x.Name == 'sub').Value}</p>
                                                </Col>
                                                <Col sm={12} md={6} lg={6}>
                                                    <b>Name</b>
                                                    <p>{data.UserAttributes.find(x => x.Name == 'name').Value}</p>
                                                </Col>
                                                <Col sm={12} md={6} lg={6}>
                                                    <b>Birthdate</b>
                                                    <p>{dateFormat(data.UserAttributes.find(x => x.Name == 'birthdate').Value, "dd mmmm yyyy")}</p>
                                                </Col>
                                                <Col sm={12} md={6} lg={6}>
                                                    <b>Gender</b>
                                                    <p>{data.UserAttributes.find(x => x.Name == 'gender').Value}</p>
                                                </Col>
                                                <Col sm={12} md={6} lg={6}>
                                                    <b>Email</b>
                                                    <p>{data.UserAttributes.find(x => x.Name == 'email').Value}</p>
                                                </Col>
                                                <Col sm={12} md={6} lg={6}>
                                                    <b>Phone Number</b>
                                                    <p>{data.UserAttributes.find(x => x.Name == 'phone_number').Value}</p>
                                                </Col>
                                                <Col sm={12} md={6} lg={6}>
                                                    <b>Status</b>
                                                    <p>{data.Enabled ? 'Enabled' : 'Disabled'}</p>
                                                </Col>
                                                <Col sm={12} md={6} lg={6}>
                                                    <b>Confirmation Status</b>
                                                    <p>{data.UserStatus}</p>
                                                </Col>
                                                <Col sm={12} md={6} lg={6}>
                                                    <b>Created at</b>
                                                    <p>{dateFormat(data.UserCreateDate, "dd/mm/yyyy HH:MM:ss")}</p>
                                                </Col>
                                                <Col sm={12} md={6} lg={6}>
                                                    <b>Last Modified</b>
                                                    <p>{dateFormat(data.UserLastModifiedDate, "dd/mm/yyyy HH:MM:ss")}</p>
                                                </Col>
                                            </Row>
                                        )}
                                    </Card.Body>
                                    <Card.Footer>
                                        <ButtonGroup aria-label="Button Operation">
                                            <Button variant="warning" onClick={() => router.push({ pathname: '/superadmin/users/edit/[id]', query: { id: id } })}>
                                                Update User
                                            </Button>
                                            {data && data.Enabled ? (
                                                <Button variant="secondary" onClick={() => disableUser(id)}>
                                                    Disable User
                                                </Button>
                                            ) : (
                                                <>
                                                    <Button variant="primary" onClick={() => enableUser(id)}>
                                                        Enable User
                                                    </Button>
                                                    <Button variant="danger" onClick={() => deleteUser(id)}>
                                                        Delete User
                                                    </Button>
                                                </>
                                            )}
                                        </ButtonGroup>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        </Row>
                    </SectionBody>
                </Section>
            </AdminLayout>
        </>
    );
}

export default ShowUserPage;