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