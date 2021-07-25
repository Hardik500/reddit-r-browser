import React from "react";
import "./style.css";

const Image = props => {
    const [isLoaded, setIsLoaded] = React.useState(false);

    return (
        <React.Fragment>
            <img
                className={`image image--thumb ${isLoaded ? "image--thumb-loaded" : "image--thumb-not-loaded"}`}
                alt={props.alt}
                src={props.thumbnail}
                width={props.width}
                height={props.height}
            />
            <img
                onLoad={() => {
                    setIsLoaded(true);
                }}
                className={`image image--full ${isLoaded ? "image--loaded" : "image--not-loaded"}`}
                width={props.width}
                height={props.height}
                alt={props.alt}
                src={props.src}
            />
        </React.Fragment>
    );
};

export default Image;