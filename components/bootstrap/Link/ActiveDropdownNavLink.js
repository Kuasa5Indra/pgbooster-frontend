import { useRouter } from "next/router";

const ActiveDropdownNavLink = ({ id, routes, title, iconClassName, children }) => {
    const data_target = "#" + id;
    const router = useRouter();

    if(routes.includes(router.asPath)){
        return (
            <li className="nav-item">
                <a className="nav-link" data-bs-target={data_target} data-bs-toggle="collapse" href="#">
                    <i className={iconClassName}></i><span>{title}</span><i className="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id={id} className="nav-content collapse show" data-bs-parent="#sidebar-nav">
                    { children }
                </ul>
            </li>
        );
    } else {
        return (
            <li className="nav-item">
                <a className="nav-link collapsed" data-bs-target={data_target} data-bs-toggle="collapse" href="#">
                    <i className={iconClassName}></i><span>{title}</span><i className="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id={id} className="nav-content collapse " data-bs-parent="#sidebar-nav">
                    { children }
                </ul>
            </li>
        );
    }
}

export default ActiveDropdownNavLink;