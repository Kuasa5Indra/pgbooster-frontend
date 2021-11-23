const EmptyState = ({ children }) => {
    return (
        <div className="empty-state">
            <div className="empty-state-icon">
                <i className="fas fa-question"></i>
            </div>
            <h2>We couldn't find any data</h2>
            <p className="lead">
                Sorry we can't find any data, to get rid of this message, make at least 1 entry.
            </p>
            { children }
        </div>
    );
}

export default EmptyState;