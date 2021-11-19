import Head from "next/head";
import Link from 'next/link';
import Layout from "../../components/layouts/Layout";
import api from "../../utils/api";

const instances = ({instances}) => {
    return (
        <>
            <Head>
                <title>Autoscaling Instances &mdash; PgBooster</title>
            </Head>
            <Layout>
                <div className="main-content">
                    <section className="section">
                        <div className="section-header">
                            <h1>Auto Scaling</h1>
                            <div className="section-header-breadcrumb">
                                <div className="breadcrumb-item active"><Link href="/dashboard"><a>Dashboard</a></Link></div>
                                <div className="breadcrumb-item">Autoscaling Instances</div>
                            </div>
                        </div>

                        <div className="section-body">
                            <h2 className="section-title">Autoscaling Instances</h2>
                            <p className="section-lead">
                                This is the list of running autoscaling instances
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
                                                            <th>Type</th>
                                                            <th>Auto Scaling Group Name</th>
                                                            <th>Availability Zone</th>
                                                            <th>Lifecycle State</th>
                                                            <th>Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {instances.data.map((data) => {
                                                            return (
                                                                <tr key={data.InstanceId}>
                                                                    <td>{data.InstanceId}</td>
                                                                    <td>{data.InstanceType}</td>
                                                                    <td>{data.AutoScalingGroupName}</td>
                                                                    <td>{data.AvailabilityZone}</td>
                                                                    <td>{data.LifecycleState}</td>
                                                                    <td>{data.HealthStatus}</td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
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
    const res = await api.get('/autoscaling/instances')
    const instances = await res.data

    if (!instances) {
        return {
            notFound: true,
        }
    }

    return {
        props: { instances },
        revalidate: 10,
    }
}

export default instances;