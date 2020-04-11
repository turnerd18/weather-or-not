import React, { useContext } from "react";
import { LocationStore, loadingState } from "../stores/locationStore";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

export default () => {
    const { loadState, currentWeather } = useContext(LocationStore);

    const humidity = currentWeather?.relativeHumidity?.value;

    return (
        <>
            {loadState === loadingState.LOADING && <Skeleton height={300} width={300} />}
            {loadState === loadingState.LOADED && (
                <Card>
                    <CardHeader title='Humidity'/>
                    <CardContent>
                        <p>{`${humidity?.toFixed()}%`}</p>
                    </CardContent>
                </Card>
            )}
        </>
    );
};
