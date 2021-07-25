
import Loader from "react-loader-spinner";

// This file contains the loader components for reusablity purposes

export const ContentLoader = ({ color = "#e28640" }) => {
    return (
        <div style={{ textAlign: "center", marginTop: "20px"}}>
            <Loader
                type="Bars"
                color={color}
                height={75}
                width={75}
                timeout={3000} //3 secs
            />
        </div>
    );
};

export const PageLoader = () => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                height: "90vh",
                justifyContent: "center",
            }}
        >
            <Loader
                type="Puff"
                color="#e28640"
                height={75}
                width={75}
                timeout={10000} //10 secs
            />
        </div>
    );
}