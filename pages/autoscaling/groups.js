import Head from "next/head";
import Link from 'next/link';
import Layout from "../../components/layouts/Layout";
import dateFormat from "dateformat";
import api from "../../utils/api";

const groups = ({ groups }) => {
    return (
        <>
            <Head>
                <title>Autoscaling Groups &mdash; PgBooster</title>
            </Head>
            <Layout>
                <div className="main-content">
                    <section className="section">
                        <div className="section-header">
                            <h1>Auto Scaling</h1>
                            <div className="section-header-breadcrumb">
                                <div className="breadcrumb-item active"><Link href="/dashboard"><a>Dashboard</a></Link></div>
                                <div className="breadcrumb-item">Autoscaling Groups</div>
                            </div>
                        </div>

                        <div className="section-body">
                            <h2 className="section-title">Autoscaling Groups</h2>
                            <p className="section-lead">
                                This is the list of autoscaling groups
                            </p>
                            <div className="row">
                                <div className="col-md-12 col-sm-6 col-lg-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4>Groups</h4>
                                        </div>
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <table className="table table-bordered table-md">
                                                    <thead>
                                                        <tr>
                                                            <th>Name</th>
                                                            <th>Min Capacity</th>
                                                            <th>Desired Capacity</th>
                                                            <th>Max Capacity</th>
                                                            <th>Availability Zone</th>
                                                            <th>Created at</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        { groups.data.map((data) => {
                                                            return (
                                                                <tr key={data.AutoScalingGroupARN}>
                                                                    <td>{data.AutoScalingGroupName}</td>
                                                                    <td>{data.MinSize}</td>
                                                                    <td>{data.DesiredCapacity}</td>
                                                                    <td>{data.MaxSize}</td>
                                                                    <td>{data.AvailabilityZones.toString()}</td>
                                                                    <td>{dateFormat(data.CreatedTime, "dd/mm/yyyy HH:MM:ss")}</td>
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
    const res = await api.get('/autoscaling/groups')
    const groups = await res.data

    if (!groups) {
        return {
            notFound: true,
        }
    }

    return {
        props: { groups },
        revalidate: 10,
    }
}

export default groups;