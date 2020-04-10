import React from "react";

export default ({ temperature, description }) => {
    let formattedTemperature =
        temperature != null
            ? `${(temperature * (9 / 5) + 32).toFixed()}°`
            : null;

    return (
        <>
            <h1>{formattedTemperature || "--°"}</h1>
            <h2>{description}</h2>
        </>
    );
};
