import './style.css'

import React from "react";
import LazyLoad from 'react-lazyload';

import Image from "../Image";

const container = {
    backgroundColor: "#eee",
    cursor: "pointer",
    overflow: "hidden",
    position: "relative"
};

export default function Photo(props) {
    const {
        index,
        photo,
        direction,
        handleHover,
        filterTitleText,
        clickHandler,
        top,
        left,
    } = props;

    function addDefaultSrc(ev){
        ev.target.src = 'data:image/png;base64,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'
    }

    if (direction === "column") {
        container.position = "absolute";
        container.left = left;
        container.top = top;
    }

    const {
        src,
        height,
        width,
        title,
    } = photo;

    if(title?.toLowerCase()?.includes(filterTitleText?.toLowerCase())){
        return (
            <div
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={() => handleHover(null)}
                key={index}
                onClick={() => clickHandler(index)}
                className="image-container"
            >
                <LazyLoad height={height} width={width} once={true} offset={350}>
                    <Image {...photo} alt={src} onError={addDefaultSrc}/>
                </LazyLoad>

                <div className="top-center">{title}</div>
            </div>
        );
    }

    return null;
}