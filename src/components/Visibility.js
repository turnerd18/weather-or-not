import React, { useContext } from "react";
import { LocationStore, loadingState } from "../stores/locationStore";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

export default () => {
    const { loadState, currentWeather } = useContext(LocationStore);

    const visibilityKilometers = currentWeather?.visibility?.value / 1000;

    return (
        <>
            {loadState === loadingState.LOADING && <Skeleton />}
            {loadState === loadingState.LOADED && (
                <Card>
                    <CardHeader title='Visibility'/>
                    <CardContent>
                        <p>{`${visibilityKilometers?.toFixed()} km`}</p>
                    </CardContent>
                </Card>
            )}
        </>
    );
};

