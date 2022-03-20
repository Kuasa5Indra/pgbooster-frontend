import Head from "next/head";
import AdminLayout from "../../../components/layouts/AdminLayout";
import Link from "next/link";
import { Section, SectionBody, SectionHeader } from "../../../components/bootstrap/Section";
import { Breadcrumb, BreadcrumbItem } from "../../../components/bootstrap/SectionBreadcrumb";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { EmptyState } from "../../../components/interface";
import swal from "sweetalert";
import { useRouter } from "next/router";
import nookies from "nookies";
import api from "../../../utils/api";

const UsersPage = ({ users }) => {
    const router = useRouter();

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

    return (
        <>
            <Head>
                <title>Users  &mdash; SuperAdmin</title>
            </Head>
            <AdminLayout>
                <Section>
                    <SectionHeader title="User Management">
                        <Breadcrumb>
                            <BreadcrumbItem href="/superadmin/users" text="Home" />
                            <BreadcrumbItem text="Amazon Cognito" />
                            <BreadcrumbItem text="User Management" active />
                        </Breadcrumb>
                    </SectionHeader>
                    <SectionBody>
                        <Row>
                            <Col sm={6} md={12} lg={12}>
                                <Card>
                                    <Card.Body>
                                        <Card.Header><Button onClick={() => router.push('/superadmin/users/create')}>Create User</Button></Card.Header>
                                        <Card.Title>Users</Card.Title>
                                        {users.data.Users.length > 0 ? (
                                            <Table responsive="lg" bordered>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Sub</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Email</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col">Confirmation Status</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {users.data.Users.map((items, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    <Link href={{pathname: '/superadmin/users/[id]', query: {id: items.Username}}}>
                                                                        <a>{items.Username}</a>
                                                                    </Link>
                                                                </td>
                                                                <td>{items.Attributes.find(x => x.Name == 'name').Value}</td>
                                                                <td>{items.Attributes.find(x => x.Name == 'email').Value}</td>
                                                                <td>{items.Enabled ? 'Enabled' : 'Disabled'}</td>
                                                                <td>{items.UserStatus}</td>
                                                                <td>
                                                                    {items.Enabled ? (
                                                                        <Button variant="secondary" onClick={() => disableUser(items.Username)}>
                                                                            Disable
                                                                        </Button>
                                                                    ) : (
                                                                        <Button variant="primary" onClick={() => enableUser(items.Username)}>
                                                                            Enable
                                                                        </Button>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </Table>
                                        ) : (
                                            <EmptyState />
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </SectionBody>
                </Section>
            </AdminLayout>
        </>
    );
};

export async function getServerSideProps(context) {
    const token = nookies.get(context).supertoken;
    const res = await api.get('/superadmin/users', {headers: { "Authorization": "Bearer " + token}});
    const users = await res.data

    if (!users) {
        return {
            notFound: true,
        }
    }

    return {
        props: { users }
    }
}

export default UsersPage;
