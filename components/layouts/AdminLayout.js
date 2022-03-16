import AdminNavbar from "./AdminNavbar";
import Footer from "./Footer";
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children }) => {
    return (
        <>
            <AdminNavbar />
            <AdminSidebar />
            {children}
            <Footer />
            <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
        </>
    );
}

export default AdminLayout;