const Breadcrumb = ({ children }) => {
    return (
        <nav>
            <ol className="breadcrumb">
                { children }
            </ol>
        </nav>
    );
}

export default Breadcrumb;