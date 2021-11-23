import Link from 'next/link';
import { useRouter } from 'next/router';

const ActiveNavLink = ({ href, children }) => {
    const router = useRouter();

    if(router.asPath === href){
        return ( 
            <li className="active">
                <Link href={href} passHref>
                    { children }
                </Link>
            </li> 
        );
    } else {
        return ( 
            <li>
                <Link href={href} passHref>
                    { children }
                </Link>
            </li> 
        );
    }
}
 
export default ActiveNavLink;