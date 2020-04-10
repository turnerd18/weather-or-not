import React, { useContext, useEffect, useState } from "react";
import { LocationStore } from "../stores/locationStore";
import { fetchRelation } from "../weatherApi";
import { Card, CardContent, Grid } from "@material-ui/core";
import moment from "moment";
import styled from "styled-components";

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
    const locationState = useContext(LocationStore);
    const [hourlyForecast, setHourlyForecast] = useState([]);

    const hourlyForecastUrl =
        locationState?.weatherGrid?.properties?.forecastHourly;
    useEffect(() => {
        fetchHourlyForecast(hourlyForecastUrl).then(setHourlyForecast);
    }, [hourlyForecastUrl]);

    return (
        <>
            <Grid item>
                <Header>Hourly forecast</Header>
            </Grid>
            <Grid
                item
                container
                spacing={1}
                direction='row'
                alignItems='center'
                justify='center'>
                {hourlyForecast.slice(0, 12).map((hourForecast, index) => {
                    const hourLabel = moment(hourForecast.startTime).format(
                        "h:mm a"
                    );
                    return (
                        <Grid item key={index}>
                            <Card>
                                <CardContent>
                                    <p>{hourLabel}</p>
                                    <p>
                                        {hourForecast.temperature}°
                                        {hourForecast.temperatureUnit}
                                    </p>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};
