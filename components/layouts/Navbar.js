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
        <>
            <div className="navbar-bg"></div>
            <nav className="navbar navbar-expand-lg main-navbar">
                <form className="form-inline mr-auto">
                    <ul className="navbar-nav mr-3">
                        <li><a href="#" data-toggle="sidebar" className="nav-link nav-link-lg"><i className="fas fa-bars"></i></a></li>
                    </ul>
                </form>
                <ul className="navbar-nav navbar-right">
                    <li className="dropdown"><a href="#" data-toggle="dropdown" className="nav-link dropdown-toggle nav-link-lg nav-link-user">
                        <img alt="image" src="/assets/img/avatar/avatar-1.png" className="rounded-circle mr-1" />
                        <div className="d-sm-none d-lg-inline-block">{!data ? "user" : data.find(x => x.Name === 'name').Value}</div></a>
                        <div className="dropdown-menu dropdown-menu-right">
                            <a href="#" className="dropdown-item has-icon">
                                <i className="far fa-user"></i> Profile
                            </a>
                            <a href="#" className="dropdown-item has-icon">
                                <i className="fas fa-bolt"></i> Activities
                            </a>
                            <a href="#" className="dropdown-item has-icon">
                                <i className="fas fa-cog"></i> Settings
                            </a>
                            <div className="dropdown-divider"></div>
                            <a href="#" className="dropdown-item has-icon text-danger" onClick={() => logout()}>
                                <i className="fas fa-sign-out-alt"></i> Logout
                            </a>
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Navbar;