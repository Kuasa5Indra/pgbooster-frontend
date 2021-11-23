const SectionBody = ({title, lead, children, ...props}) => {
    return ( 
        <div className="section-body">
            {title != null && <h2 className="section-title">{title}</h2> }
            {lead != null && <p className="section-lead">{lead}</p>}
            {children}
        </div>
    );
}
 
export default SectionBody;