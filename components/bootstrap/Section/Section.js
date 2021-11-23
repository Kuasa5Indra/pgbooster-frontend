const Section = ({ children }) => {
    return ( 
        <div className="main-content">
            <section className="section">
                { children }
            </section>
        </div>
    );
}
 
export default Section;