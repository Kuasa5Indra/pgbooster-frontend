import Link from "next/link";
import { useRouter } from "next/router";

const ActiveDropdownItem = ({ href, text }) => {
    const router = useRouter();

    if(router.asPath === href){
        return (
            <li>
                <Link href={href}>
                    <a className="active">
                        <i className="bi bi-circle"></i><span>{text}</span>
                    </a>
                </Link>
            </li>
        );
    } else {
        return (
            <li>
                <Link href={href}>
                    <a>
                        <i className="bi bi-circle"></i><span>{text}</span>
                    </a>
                </Link>
            </li>
        );
    }
}

export default ActiveDropdownItem;