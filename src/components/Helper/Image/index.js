import React from "react";
import "./style.css";

const Image = props => {
    const [isLoaded, setIsLoaded] = React.useState(false);

    return (
        <React.Fragment>
            <img
                className="image thumb"
                alt={props.alt}
                src={props.thumbnail}
                width={props.width}
                height={props.height}
                style={{ visibility: isLoaded ? "hidden" : "visible", display: isLoaded ? "none" : "block"}}
            />
            <img
                onLoad={() => {
                    setIsLoaded(true);
                }}
                className={`image full ${isLoaded ? "image-loaded" : "image-not-loaded"}`}
                width={props.width}
                height={props.height}
                alt={props.alt}
                src={props.src}
            />
            <div className="top-center">{props.title}</div>
        </React.Fragment>
    );
};

export default Image;