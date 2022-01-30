import Link from "next/link";
import Image from "next/image";
import api from "../../utils/api";
import nookies from "nookies";
import useSWR from "swr";
import {useRouter} from "next/router";

const fetcher = url => api.get(url, {headers: { "Authorization": "Bearer " + nookies.get().token}}).then(res => res.data.data)

const Navbar = () => {
    const router = useRouter();
    const {token} = nookies.get();
    const { data, error } = useSWR('/auth/user', fetcher);

    const logout = () => {
        nookies.destroy(null, 'token');
      api.get('/auth/logout', {headers: { "Authorization": "Bearer " + token}})
          .then((response) => {
              router.push('/login');
          })
          .catch((error) => {
              console.log(error.response.data);
          })
    }
    
    return (
        <header id="header" className="header fixed-top d-flex align-items-center">
            <div className="d-flex align-items-center justify-content-between">
                <Link href="/">
                    <a className="logo d-flex align-items-center">
                        <Image src="/assets/img/pgbooster.png" alt="" width={100} height={100} />
                        <span className="d-none d-lg-block">PgBooster</span>
                    </a>
                </Link>
                <i className="bi bi-list toggle-sidebar-btn"></i>
            </div>

            <nav className="header-nav ms-auto">
                <ul className="d-flex align-items-center">

                    <li className="nav-item dropdown pe-3">

                        <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                            <Image src="/assets/img/avatar/avatar-1.png" alt="Profile" className="rounded-circle" width={36} height={36} />
                            <span className="d-none d-md-block dropdown-toggle ps-2">{!data ? "user" : data.find(x => x.Name === 'name').Value}</span>
                        </a>

                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                            <li className="dropdown-header">
                                <h6>{!data ? "user" : data.find(x => x.Name === 'name').Value}</h6>
                                <span>{!data ? "user" : data.find(x => x.Name === 'gender').Value}</span>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>

                            <li>
                                <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                                    <i className="bi bi-person"></i>
                                    <span>My Profile</span>
                                </a>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>

                            <li>
                                <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                                    <i className="bi bi-gear"></i>
                                    <span>Account Settings</span>
                                </a>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>

                            <li>
                                <a className="dropdown-item d-flex align-items-center" href="pages-faq.html">
                                    <i className="bi bi-question-circle"></i>
                                    <span>Need Help?</span>
                                </a>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>

                            <li>
                                <a className="dropdown-item d-flex align-items-center" href="#" onClick={() => logout()}>
                                    <i className="bi bi-box-arrow-right"></i>
                                    <span>Sign Out</span>
                                </a>
                            </li>

                        </ul>
                    </li>

                </ul>
            </nav>

        </header>
    );
}

export default Navbar;