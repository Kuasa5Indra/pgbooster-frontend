import Link from "next/link";
import { useRouter } from 'next/router';

const ActiveNavLink = ({ href, children }) => {
    const router = useRouter();

    if (router.asPath === href) {
        return (
            <li className="nav-item">
                <Link href={href}>
                    <a className="nav-link">
                        {children}
                    </a>
                </Link>
            </li>
        );
    } else {
        return (
            <li className="nav-item">
                <Link href={href}>
                    <a className="nav-link collapsed">
                        {children}
                    </a>
                </Link>
            </li>
        );
    }
}

export default ActiveNavLink;