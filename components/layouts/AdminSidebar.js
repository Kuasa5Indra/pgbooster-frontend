import Link from 'next/link';
import { ActiveNavLink, ActiveDropdownNavLink, ActiveDropdownItem } from '../bootstrap/Link';
import { useRouter } from 'next/router';

const AdminSidebar = () => {
    const router = useRouter();

    return (
        <aside id="sidebar" className="sidebar">

            <ul className="sidebar-nav" id="sidebar-nav">

                <li className="nav-heading">Amazon Cognito</li>

                <ActiveNavLink href="/superadmin/users">
                    <i className="ri-file-user-fill"></i>
                    <span>User Management</span>
                </ActiveNavLink>

            </ul>

        </aside>
    );
}

export default AdminSidebar;