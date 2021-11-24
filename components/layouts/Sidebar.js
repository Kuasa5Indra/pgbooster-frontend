import Link from 'next/link';
import { ActiveNavLink, ActiveDropdownNavLink } from '../bootstrap/Link';
import { useRouter } from 'next/router';

const Sidebar = () => {
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
                    <ActiveNavLink href="/dashboard">
                        <a className="nav-link"><i className="fas fa-tachometer-alt"></i> <span>Dashboard</span></a>
                    </ActiveNavLink>
                    <li className="menu-header">Compute</li>
                    <ActiveNavLink href="/server">
                        <a className="nav-link"><i className="fas fa-server"></i> <span>Server</span></a>
                    </ActiveNavLink>
                    <ActiveDropdownNavLink iconClassName="fab fa-cloudscale" title="Auto Scaling" routes={["/autoscaling/instances", "/autoscaling/groups"]}>
                        <ActiveNavLink href="/autoscaling/instances">
                            <a className="nav-link">Instances</a>
                        </ActiveNavLink>
                        <ActiveNavLink href="/autoscaling/groups">
                            <a className="nav-link">Groups</a>
                        </ActiveNavLink>
                    </ActiveDropdownNavLink>
                    <ActiveDropdownNavLink iconClassName="fas fa-balance-scale" title="Load Balancing" routes={["/loadbalancing", "/loadbalancing/groups"]}>
                        <ActiveNavLink href="/loadbalancing">
                            <a className="nav-link">Load Balancers</a>
                        </ActiveNavLink>
                        <ActiveNavLink href="/loadbalancing/groups">
                            <a className="nav-link">Target Groups</a>
                        </ActiveNavLink>
                    </ActiveDropdownNavLink>
                    <li className="menu-header">Infrastructure</li>
                    <ActiveNavLink href="/infrastructure">
                        <a className="nav-link"><i className="fas fa-cloud-upload-alt"></i> <span>Code</span></a>
                    </ActiveNavLink>
                </ul>
            </aside>
        </div>
    );
}

export default Sidebar;