import React from "react";
import "./style.css";

const Image = props => {
    console.log(props);
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
                className="image full"
                width={props.width}
                height={props.height}
                style={{ opacity: isLoaded ? 1 : 0, display: isLoaded ? "block" : "none" }}
                alt={props.alt}
                src={props.src}
            />
        </React.Fragment>
    );
};

export default Image;