import React, { useEffect, useContext, useState } from "react";
import { LocationStore } from "../locationStore";
import { fetchRelation, fetchStationObservations } from "../weatherApi";

export default () => {
    const [temperature, setTemperature] = useState("--°");
    const locationState = useContext(LocationStore);

    useEffect(() => {
        const asyncEffect = async () => {
            if (
                locationState?.weatherGrid?.properties?.observationStations ==
                null
            ) {
                return;
            }
            const stationsResponse = await fetchRelation(
                locationState?.weatherGrid?.properties?.observationStations
            );
            const stationsData = await stationsResponse.json();
            for (const stationUrl of stationsData.observationStations) {
                const observationsResponse = await fetchStationObservations(
                    stationUrl
                );
                const stationObservations = await observationsResponse.json();
                if (stationObservations?.properties?.temperature?.value == null) {
                    continue;
                }
                setTemperature(
                    `${stationObservations.properties.temperature.value.toFixed()}°`
                );
                break;
            }
        };
        asyncEffect();
    }, [locationState?.weatherGrid?.properties?.observationStations]);

    return <h2>{temperature}</h2>;
};
