import React, { useContext } from "react";
import { LocationStore, loadingState } from "../stores/locationStore";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

/*
Borrowed from https://gist.github.com/basarat/4670200
*/
const cardinalDirection = (angle) => {
    var val = Math.floor((angle / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
};

export default () => {
    const { loadState, currentWeather } = useContext(LocationStore);

    const windSpeedKmPerHour = currentWeather?.windSpeed?.value * 3.6;

    return (
        <>
            {loadState === loadingState.LOADING && <Skeleton height={300} width={300} />}
            {loadState === loadingState.LOADED && (
                <Card>
                    <CardHeader title='Wind Status' />
                    <CardContent>
                        <p>{`${windSpeedKmPerHour?.toFixed()} km/h`}                            {cardinalDirection(
                                currentWeather?.windDirection?.value
                            )}
                        </p>
                    </CardContent>
                </Card>
            )}
        </>
    );
};
