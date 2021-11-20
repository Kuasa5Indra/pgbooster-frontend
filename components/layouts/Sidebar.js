import Link from 'next/link';
import { useRouter } from 'next/router';

function Sidebar() {
    const router = useRouter();

    return (
        <div className="main-sidebar">
            <aside id="sidebar-wrapper">
                <div className="sidebar-brand">
                    <Link href="/">
                        <a>PgBooster</a>
                    </Link>
                </div>
                <div className="sidebar-brand sidebar-brand-sm">
                    <Link href="/">
                        <a>PgB</a>
                    </Link>
                </div>
                <ul className="sidebar-menu">
                    <li className="menu-header">Dashboard</li>
                    <li className={router.pathname == "/dashboard" ? "active" : ""}>
                        <Link href="/dashboard">
                            <a className="nav-link"><i className="fas fa-tachometer-alt"></i> <span>Dashboard</span></a>
                        </Link>
                    </li>
                    <li className="menu-header">Compute</li>
                    <li className={router.pathname == "/server" ? "active" : ""}>
                        <Link href="/server">
                            <a className="nav-link"><i className="fas fa-server"></i> <span>Server</span></a>
                        </Link>
                    </li>
                    <li className={router.pathname == "/autoscaling/instances" ||  router.pathname == "/autoscaling/groups" ? "dropdown active" : ""}>
                        <a href="" className="nav-link has-dropdown"><i className="fab fa-cloudscale"></i><span>Auto Scaling</span></a>
                        <ul className="dropdown-menu">
                            <li className={router.pathname == "/autoscaling/instances" ? "active" : ""}>
                                <Link href="/autoscaling/instances"><a className="nav-link">Instances</a></Link>
                            </li>
                            <li className={router.pathname == "/autoscaling/groups" ? "active" : ""}>
                                <Link href="/autoscaling/groups"><a className="nav-link">Groups</a></Link>
                            </li>
                        </ul>
                    </li>
                    <li className={router.pathname == "/loadbalancing" ||  router.pathname == "/loadbalancing/groups" ? "dropdown active" : ""}>
                        <a href="" className="nav-link has-dropdown"><i className="fas fa-balance-scale"></i><span>Load Balancing</span></a>
                        <ul className="dropdown-menu">
                            <li className={router.pathname == "/loadbalancing" ? "active" : ""}>
                                <Link href="/loadbalancing"><a className="nav-link">Load Balancers</a></Link>
                            </li>
                            <li className={router.pathname == "/loadbalancing/groups" ? "active" : ""}>
                                <Link href="/loadbalancing/groups"><a className="nav-link">Target Groups</a></Link>
                            </li>
                        </ul>
                    </li>
                    <li className="menu-header">Infrastructure</li>
                    <li className={router.pathname == "/infrastructure" ? "active" : ""}>
                        <Link href="/infrastructure">
                            <a className="nav-link"><i className="fas fa-cloud-upload-alt"></i> <span>Code</span></a>
                        </Link>
                    </li>
                </ul>
            </aside>
        </div>
    );
}

export default Sidebar;