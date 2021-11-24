import { useRouter } from 'next/router';

const ActiveDropdownNavLink = ({routes, title, iconClassName, children}) => {
    const router = useRouter();
    let dropdownActive = '';

    if(routes.includes(router.asPath)){
        return (
            <li className="nav-item dropdown active">
                <a href="" className="nav-link has-dropdown"><i className={iconClassName}></i> <span>{title}</span></a>
                <ul className="dropdown-menu">
                    { children }
                </ul>
            </li>
        );
    } else {
        return (
            <li className="nav-item dropdown">
                <a href="" className="nav-link has-dropdown"><i className={iconClassName}></i> <span>{title}</span></a>
                <ul className="dropdown-menu">
                    { children }
                </ul>
            </li>
        );
    }
}

export default ActiveDropdownNavLink;