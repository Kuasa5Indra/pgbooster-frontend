const SectionHeader = ({ title, children }) => {
    return (
        <div className="pagetitle">
            <h1>{title}</h1>
            { children }
        </div>
    );
}

export default SectionHeader;