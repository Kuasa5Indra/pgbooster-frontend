const SectionHeader = ({title, children, ...props}) => {
    return ( 
        <div className="section-header">
            <h1>{title}</h1>
            { children }
        </div>
    );
}
 
export default SectionHeader;