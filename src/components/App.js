import React, { useReducer } from "react";
// import logo from "./logo.svg";
import LocationSearch from "./LocationSearch";
import theme from "../theme";
import { ThemeProvider, Grid } from "@material-ui/core";
import {
    LocationStore,
    reducer,
    fetching,
    setLocation,
    setWeatherGrid,
    fetchFailed,
    setCurrentWeather,
    fetchCompleted,
    initialState,
} from "../stores/locationStore";
import CurrentTemperature from "./CurrentTemperature";
import {
    fetchGridPoints,
    fetchRelation,
    fetchStationObservations,
} from "../weatherApi";
import HourlyForecast from "./HourlyForecast";
import styled from "styled-components";
import DailyForecast from "./DailyForecast";
import Humidity from "./Humidity";
import Visibility from "./Visibility";
import Wind from "./Wind";

const Root = styled(Grid)`
    background: linear-gradient(
        to bottom,
        #f0f9ff 0%,
        #cbebff 37%,
        #a1dbff 100%
    );
    min-height: 100vh;
    position: relative;
`;

const SideBar = styled(Grid)`
    background-color: #fff;
    margin-right: 20px !important;
`;

const Title = styled.h1`
    margin-left: 10px;
`;

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const onLocationChanged = async (location) => {
        dispatch(setLocation(location));
        dispatch(fetching());
        let weatherGrid;
        try {
            weatherGrid = await fetchGridPoints(
                location.coordinates.latitude,
                location.coordinates.longitude
            );
        } catch (error) {
            dispatch(fetchFailed());
            return;
        }

        dispatch(setWeatherGrid(weatherGrid));
        let currentWeather = null;
        try {
            const observationStationsUrl =
                weatherGrid.properties.observationStations;
            const stationsData = await fetchRelation(observationStationsUrl);
            for (const stationUrl of stationsData.observationStations) {
                const stationObservations = await fetchStationObservations(
                    stationUrl
                );
                const temperature =
                    stationObservations?.properties?.temperature?.value;
                if (temperature == null) {
                    continue;
                }
                currentWeather = stationObservations.properties;
                break;
            }
        } catch (error) {
            dispatch(fetchFailed());
            return;
        }
        dispatch(setCurrentWeather(currentWeather));
        dispatch(fetchCompleted());
    };
    const temperature = state?.currentWeather?.temperature?.value;
    const weatherDescription = state?.currentWeather?.textDescription;

    return (
        <LocationStore.Provider value={state}>
            <ThemeProvider theme={theme}>
                <div style={{ flexGrow: 1 }}>
                    <Root container>
                        <SideBar
                            item
                            sm={4}
                            md={3}
                            lg={2}
                            container
                            spacing={3}
                            direction='column'
                            alignItems='center'>
                            <Grid item>
                                <Title>Weather or Not?</Title>
                            </Grid>
                            <Grid item>
                                <LocationSearch onChanged={onLocationChanged} />
                            </Grid>
                            <Grid item>
                                {!!state.loadState && <CurrentTemperature
                                    temperature={temperature}
                                    description={weatherDescription}
                                />}
                            </Grid>
                        </SideBar>
                        <Grid
                            item
                            container
                            sm={8}
                            md={9}
                            lg={10}
                            spacing={5}
                            direction='column'
                            // justify='center'
                            alignItems='center'>
                            {!!state.loadState && (
                                <>
                                    <Grid
                                        item
                                        container
                                        xs
                                        alignItems='center'
                                        justify='center'
                                        spacing={3}>
                                        <HourlyForecast />
                                    </Grid>
                                    <Grid
                                        item
                                        container
                                        xs
                                        alignItems='center'
                                        justify='center'
                                        spacing={3}>
                                        <DailyForecast />
                                    </Grid>
                                    <Grid
                                        item
                                        container
                                        direction='column'
                                        spacing={3}
                                        xs
                                        alignItems='center'
                                        justify='center'>
                                        <Grid item xs>
                                            <h2>Today's Highlights</h2>
                                        </Grid>
                                        <Grid
                                            item
                                            container
                                            direction='row'
                                            spacing={3}
                                            xs>
                                            <Grid item xs>
                                                <Humidity />
                                            </Grid>
                                            <Grid item xs>
                                                <Visibility />
                                            </Grid>
                                            <Grid item xs>
                                                <Wind />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </Root>
                </div>
            </ThemeProvider>
        </LocationStore.Provider>
    );
}

export default App;
