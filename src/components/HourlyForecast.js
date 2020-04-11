import React, { useContext, useEffect, useState } from "react";
import { LocationStore, loadingState } from "../stores/locationStore";
import { fetchRelation } from "../weatherApi";
import { Card, Grid, GridListTile, GridList } from "@material-ui/core";
import moment from "moment";
import styled from "styled-components";
import ForecastContent from "./ForecastContent";
import { mapForecastToImage } from "../weatherMapping";
import Skeleton from "@material-ui/lab/Skeleton";

const fetchHourlyForecast = async (hourlyForecastUrl) => {
    if (hourlyForecastUrl == null) {
        return [];
    }

    const response = await fetchRelation(hourlyForecastUrl);
    return response?.properties?.periods || [];
};

const Header = styled.h2`
    text-align: center;
`;

export default () => {
    const { weatherGrid, loadState } = useContext(LocationStore);
    const [hourlyForecast, setHourlyForecast] = useState([]);

    const hourlyForecastUrl = weatherGrid?.properties?.forecastHourly;
    useEffect(() => {
        fetchHourlyForecast(hourlyForecastUrl).then(setHourlyForecast);
    }, [hourlyForecastUrl]);

    return (
        <>
            <Grid item>
                <Header>Hourly Forecast</Header>
            </Grid>
            <GridList
                cols={5.5}
                style={{
                    flexWrap: "nowrap",
                    transform: "translateZ(0)",
                    width: "100%",
                }}>
                {loadState === loadingState.LOADING &&
                    [...Array(10)].map((_, index) => (
                        <GridListTile key={index}>
                            <Skeleton height={300} width={300} />
                        </GridListTile>
                    ))}
                {loadState === loadingState.LOADED &&
                    hourlyForecast.slice(0, 12).map((hourForecast, index) => {
                        const hourLabel = moment(hourForecast.startTime).format(
                            "h:mm a"
                        );
                        return (
                            <GridListTile item key={index} xs>
                                <Card>
                                    <ForecastContent>
                                        <p>
                                            <b>{hourLabel}</b>
                                        </p>
                                        <img
                                            src={mapForecastToImage(
                                                hourForecast.shortForecast
                                            )}
                                            alt={hourForecast.shortForecast}
                                        />
                                        <p>
                                            {hourForecast.temperature}°
                                            {hourForecast.temperatureUnit}
                                        </p>
                                    </ForecastContent>
                                </Card>
                            </GridListTile>
                        );
                    })}
            </GridList>
        </>
    );
};
