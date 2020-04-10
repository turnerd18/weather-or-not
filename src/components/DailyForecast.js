import React, { useContext, useEffect, useState } from "react";
import { LocationStore } from "../stores/locationStore";
import { fetchRelation } from "../weatherApi";
import { Card, CardContent, Grid } from "@material-ui/core";
import moment from "moment";
import styled from "styled-components";

const fetchHourlyForecast = async (dailyForecastUrl) => {
    if (dailyForecastUrl == null) {
        return [];
    }

    const response = await fetchRelation(dailyForecastUrl);
    const periods = response?.properties?.periods || [];

    return periods.filter(period => period.isDaytime);
};

const buildDateLabel = (inputDate) => {

    const date = moment(inputDate);
    return date.format('ddd');

};

const Header = styled.h2`
    text-align: center;
`;

export default () => {
    const locationState = useContext(LocationStore);
    const [dailyForecast, setDailyForecast] = useState([]);

    const dailyForecastUrl =
        locationState?.weatherGrid?.properties?.forecast;
    useEffect(() => {
        fetchHourlyForecast(dailyForecastUrl).then(setDailyForecast);
    }, [dailyForecastUrl]);

    return (
        <>
            <Grid item>
                <Header>Daily forecast</Header>
            </Grid>
            <Grid
                item
                container
                spacing={1}
                direction='row'
                alignItems='center'
                wrap='nowrap'
                justify='center'>
                {dailyForecast.map((dayForecast, index) => {
                    return (
                        <Grid item key={index}>
                            <Card>
                                <CardContent>
                                    <p>{buildDateLabel(dayForecast.startTime)}</p>
                                    <p>
                                        {dayForecast.temperature}°
                                        {dayForecast.temperatureUnit}
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
