import React from "react";
import { mapForecastToImage } from "../weatherMapping";
import styled from "styled-components";

const Centered = styled.div`
    text-align: center;
`;

export default ({ temperature, description }) => {
    let formattedTemperature =
        temperature != null
            ? `${(temperature * (9 / 5) + 32).toFixed()}°F`
            : null;

    return (
        <Centered>
            <h1>{formattedTemperature || "--°"}</h1>
            <h2>{description}</h2>
            {description && <img src={mapForecastToImage(description)} alt={description} />}
        </Centered>
    );
};
