import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from './Sidebar';

function Layout({ children }) {
    return (
        <div className="main-wrapper">
            <Navbar />
            <Sidebar />
            {children}
            <Footer />
        </div>
    );
}

export default Layout;