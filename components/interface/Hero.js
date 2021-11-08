function Hero(props) {
    return (
        <div className={props.className}>
            <div className="hero-inner">
                <h2>{props.title}</h2>
                <p className="lead">{props.lead}</p>
            </div>
        </div>
    );
}

export default Hero;