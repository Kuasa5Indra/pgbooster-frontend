import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <Sidebar />
            {children}
            <Footer />
            <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
        </>
    );
}

export default Layout;