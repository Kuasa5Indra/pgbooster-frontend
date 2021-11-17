import Head from "next/head";
import Layout from "../../components/layouts/Layout";
import Link from "next/link";
import dateFormat from "dateformat";
import api from "../../utils/api";
import { useRouter } from 'next/router'

function show({ stack }) {
    const router = useRouter();
    const { name } = router.query;

    return (
        <>
            <Head>
                <title>Detail Stack &mdash; PgBooster</title>
            </Head>
            <Layout>
                <div className="main-content">
                    <section className="section">
                        <div className="section-header">
                            <h1>Detail Stack</h1>
                            <div className="section-header-breadcrumb">
                                <div className="breadcrumb-item active"><Link href="/dashboard"><a>Dashboard</a></Link></div>
                                <div className="breadcrumb-item active"><Link href="/infrastructure"><a>Code</a></Link></div>
                                <div className="breadcrumb-item">Detail Stack</div>
                            </div>
                        </div>

                        <div className="section-body">
                            <h2 className="section-title">{name}</h2>
                            <div className="row">
                                <div className="col-sm-6 col-md-12 col-lg-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4>Stack Information</h4>
                                        </div>
                                        <div className="card-body">
                                            <b>Stack Id</b> <p>{stack[0].StackId}</p>
                                            <b>Stack Name</b> <p>{stack[0].StackName}</p>
                                            <b>Stack Creation</b> <p>{dateFormat(stack[0].CreationTime, "dd/mm/yyyy HH:MM:ss")}</p>
                                            <b>Stack Status</b> <p>{stack[0].StackStatus}</p>
                                            <b>Disable Rollback</b> 
                                            <p>{stack[0].DisableRollback ? "true" : "false"}</p>
                                            <b>Enable Termination Protection</b> 
                                            <p>{stack[0].EnableTerminationProtection ? "true" : "false"}</p>
                                        </div>
                                        <div className="card-footer">
                                            Footer Card
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

export async function getStaticPaths() {
    const res = await api.get("/stacks")
    const stacks = await res.data.data

    const paths = stacks.map((stack) => ({
        params: { name: stack.StackName },
    }))

    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const res = await api.get(`/stacks/describe?name=${params.name}`)
    const stack = await res.data.data
    return { props: { stack } }
}

export default show;