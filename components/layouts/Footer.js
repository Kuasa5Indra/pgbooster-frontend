const Footer = () => {
    return (
        <footer id="footer" className="footer">
            <div className="copyright">
                &copy; Copyright <strong><span>PgBooster</span></strong>. All Rights Reserved
            </div>
            <div className="credits">
                2021 - {new Date().getFullYear()}
            </div>
        </footer>
    );
}

export default Footer;