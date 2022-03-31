import Link from "next/link";
import Image from "next/image";
import api from "../../utils/api";
import nookies from "nookies";
import useSWR from "swr";
import swal from "sweetalert";
import {useRouter} from "next/router";

const AdminNavbar = () => {
    const router = useRouter();

    const logout = () => {
        console.log("Hey");
        swal({
            title: "OK",
            text: "Logout success",
            icon: "success",
        }).then(function () {
            nookies.destroy(null, 'supertoken');
            router.push('/superadmin/login');
        })
    }
    
    return (
        <header id="header" className="header fixed-top d-flex align-items-center">
            <div className="d-flex align-items-center justify-content-between">
                <Link href="/">
                    <a className="logo d-flex align-items-center">
                        <span className="d-none d-lg-block">SuperAdmin</span>
                    </a>
                </Link>
                <i className="bi bi-list toggle-sidebar-btn"></i>
            </div>

            <nav className="header-nav ms-auto">
                <ul className="d-flex align-items-center">

                    <li className="nav-item dropdown pe-3">

                        <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                            <Image src="/assets/img/avatar/avatar-1.png" alt="Profile" className="rounded-circle" width={36} height={36} />
                            <span className="d-none d-md-block dropdown-toggle ps-2">SuperAdmin</span>
                        </a>

                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                            <li className="dropdown-header">
                                <h6>SuperAdmin</h6>
                                <span>Owner of AWS Cloud</span>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>

                            {/*<li>
                                <Link href="/profile">
                                    <a className="dropdown-item d-flex align-items-center">
                                        <i className="bi bi-person"></i>
                                        <span>My Profile</span>
                                    </a>
                                </Link>
                            </li>*/}
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

export default AdminNavbar;