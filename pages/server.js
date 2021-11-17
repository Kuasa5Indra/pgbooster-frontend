import Head from "next/head";
import Layout from "../components/layouts/Layout";
import Link from "next/link";
import api from "../utils/api";
import swal from "sweetalert";
import { useRouter } from "next/router";

function server({ instances }) {
    const router = useRouter();

    async function startInstance(id) {
        const res = await api.get("/instances/" + id + "/start")
        const instance = await res.data
        swal({
            title: instance.status,
            text: instance.message,
            icon: "success",
        }).then(function() {
            router.reload('/server');
        });
    };

    async function stopInstance(id) {
        swal({
            title: "Are you sure ?",
            text: "Once its stopped, you can still start your instance again",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then(async (willDelete) => {
            if (willDelete) {
                const res = await api.get("/instances/" + id + "/stop")
                const instance = await res.data
                swal({
                    title: instance.status,
                    text: instance.message,
                    icon: "success",
                }).then(function() {
                    router.reload('/server');
                });
            }
        });
    };

    async function rebootInstance(id) {
        const res = await api.get("/instances/" + id + "/reboot")
        const instance = await res.data
        swal({
            title: instance.status,
            text: instance.message,
            icon: "success",
        }).then(function() {
            router.reload('/server');
        });
    };

    async function terminateInstance(id) {
        swal({
            title: "Are you sure ?",
            text: "Once its terminated, you will not able to restore your instance",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then(async (willDelete) => {
            if (willDelete) {
                const res = await api.get("/instances/" + id + "/terminate")
                const instance = await res.data
                swal({
                    title: instance.status,
                    text: instance.message,
                    icon: "success",
                }).then(function() {
                    router.reload('/server');
                });
            }
        });
    };

    return (
        <>
            <Head>
                <title>Server &mdash; PgBooster</title>
            </Head>
            <Layout>
                <div className="main-content">
                    <section className="section">
                        <div className="section-header">
                            <h1>Server</h1>
                            <div className="section-header-breadcrumb">
                                <div className="breadcrumb-item active"><Link href="/dashboard"><a>Dashboard</a></Link></div>
                                <div className="breadcrumb-item">Server</div>
                            </div>
                        </div>

                        <div className="section-body">
                            <h2 className="section-title">Cloud Server</h2>
                            <p className="section-lead">
                                This is the list of running servers
                            </p>
                            <div className="row">
                                <div className="col-md-12 col-sm-6 col-lg-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4>Instances</h4>
                                        </div>
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <table className="table table-bordered table-md">
                                                    <thead>
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>Name</th>
                                                            <th>Status</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    {instances.data.map((data) => {
                                                        return (
                                                            <tbody key={data.ReservationId}>
                                                                {data.Instances.map((instance) => {
                                                                    return (
                                                                        <tr key={instance.InstanceId}>
                                                                            <td>
                                                                                {instance.InstanceId}
                                                                            </td>
                                                                            <td>{instance.Tags.find((tag) => tag.Key == "Name").Value}</td>
                                                                            <td>{instance.State.Name}</td>
                                                                            <td>
                                                                                <div className="btn-group" role="group" aria-label="Button Operation">
                                                                                    <button type="button" className="btn btn-primary btn-icon icon-left" onClick={() => startInstance(instance.InstanceId)}>
                                                                                        <i className="far fa-play-circle"></i>Start
                                                                                    </button>
                                                                                    <button type="button" className="btn btn-warning btn-icon icon-left" onClick={() => stopInstance(instance.InstanceId)}>
                                                                                        <i className="fas fa-stop-circle"></i>Stop
                                                                                    </button>
                                                                                    <button type="button" className="btn btn-dark btn-icon icon-left" onClick={() => rebootInstance(instance.InstanceId)}>
                                                                                        <i className="fas fa-bolt"></i>Reboot
                                                                                    </button>
                                                                                    <button type="button" className="btn btn-danger btn-icon icon-left" onClick={() => terminateInstance(instance.InstanceId)}>
                                                                                        <i className="fas fa-power-off"></i>Terminate
                                                                                    </button>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                })}
                                                            </tbody>
                                                        );
                                                    })}
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Layout>
        </>
    );
}

export async function getStaticProps(context) {
    const res = await api.get('/instances')
    const instances = await res.data

    if (!instances) {
        return {
            notFound: true,
        }
    }

    return {
        props: { instances },
        revalidate: 60,
    }
}

export default server;