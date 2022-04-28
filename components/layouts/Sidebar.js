import Link from 'next/link';
import { ActiveNavLink, ActiveDropdownNavLink, ActiveDropdownItem } from '../bootstrap/Link';
import { useRouter } from 'next/router';

const Sidebar = () => {
    const router = useRouter();

    return (
        <aside id="sidebar" className="sidebar">

            <ul className="sidebar-nav" id="sidebar-nav">

                <li className="nav-heading">Dashboard</li>

                <ActiveNavLink href="/dashboard">
                    <i className="bi bi-grid"></i>
                    <span>Dashboard</span>
                </ActiveNavLink>

                <li className="nav-heading">Computing</li>

                <ActiveNavLink href="/instance">
                    <i className="ri-cpu-line"></i>
                    <span>Instance</span>
                </ActiveNavLink>

                <ActiveDropdownNavLink title="Auto Scaling" id="auto-scaling" iconClassName="bi bi-arrow-down-up" routes={["/autoscaling/instances", "/autoscaling/groups"]}>
                    <ActiveDropdownItem text="Instances" href="/autoscaling/instances" />
                    <ActiveDropdownItem text="Groups" href="/autoscaling/groups" />
                </ActiveDropdownNavLink>

                <ActiveDropdownNavLink title="Load Balancing" id="load-balancing" iconClassName="ri-scales-fill" routes={["/loadbalancing", "/loadbalancing/groups"]}>
                    <ActiveDropdownItem text="Load Balancers" href="/loadbalancing" />
                    <ActiveDropdownItem text="Target Groups" href="/loadbalancing/groups" />
                </ActiveDropdownNavLink>

                <li className="nav-heading">Database Engine</li>

                <ActiveNavLink href="/database">
                    <i className="ri-database-2-line"></i>
                    <span>DB Instances</span>
                </ActiveNavLink>

                <ActiveDropdownNavLink title="DB Snapshots" id="db-snapshots" iconClassName="ri-database-2-line" routes={["/database/snapshot", "/database/snapshot/cluster"]}>
                    <ActiveDropdownItem text="Instance" href="/database/snapshot" />
                    <ActiveDropdownItem text="Cluster" href="/database/snapshot/cluster" />
                </ActiveDropdownNavLink>

                <li className="nav-heading">Infrastructure as Code</li>

                <ActiveNavLink href="/infrastructure">
                    <i className="bi bi-stack"></i>
                    <span>Stack</span>
                </ActiveNavLink>

            </ul>

        </aside>
    );
}

export default Sidebar;