import React, { useContext, useEffect, useState } from "react";
import { LocationStore, loadingState } from "../stores/locationStore";
import { fetchRelation } from "../weatherApi";
import { Card, Grid, GridList, GridListTile } from "@material-ui/core";
import moment from "moment";
import styled from "styled-components";
import { mapForecastToImage } from "../weatherMapping";
import ForecastContent from "./ForecastContent";
import Skeleton from "@material-ui/lab/Skeleton";

const fetchHourlyForecast = async (dailyForecastUrl) => {
    if (dailyForecastUrl == null) {
        return [];
    }

    const response = await fetchRelation(dailyForecastUrl);
    const periods = response?.properties?.periods || [];

    return periods.filter((period) => period.isDaytime);
};

const buildDateLabel = (inputDate) => {
    const date = moment(inputDate);
    return date.format("ddd");
};

const Header = styled.h2``;

export default () => {
    const { weatherGrid, loadState } = useContext(LocationStore);
    const [dailyForecast, setDailyForecast] = useState([]);

    const dailyForecastUrl = weatherGrid?.properties?.forecast;
    useEffect(() => {
        fetchHourlyForecast(dailyForecastUrl).then(setDailyForecast);
    }, [dailyForecastUrl]);

    return (
        <>
            <Grid item>
                <Header>Daily Forecast</Header>
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
                    dailyForecast.map((dayForecast, index) => {
                        return (
                            <GridListTile item key={index} xs>
                                <Card>
                                    <ForecastContent>
                                        <p>
                                            <b>
                                                {buildDateLabel(
                                                    dayForecast.startTime
                                                )}
                                            </b>
                                        </p>
                                        <img
                                            src={mapForecastToImage(
                                                dayForecast.shortForecast
                                            )}
                                            alt={dayForecast.shortForecast}
                                        />
                                        <p>
                                            {dayForecast.temperature}°
                                            {dayForecast.temperatureUnit}
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
