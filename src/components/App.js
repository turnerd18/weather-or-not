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
    background-color: #f0f0f0;
    min-height: 100vh;
    position: relative;
`;

const SideBar = styled(Grid)`
    background-color: #fff;
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
                            sm={5}
                            md={3}
                            container
                            spacing={3}
                            direction='column'
                            // justify='center'
                            alignItems='center'>
                            <Grid item>
                                <LocationSearch onChanged={onLocationChanged} />
                            </Grid>
                            <Grid item>
                                <CurrentTemperature
                                    temperature={temperature}
                                    description={weatherDescription}
                                />
                            </Grid>
                        </SideBar>
                        <Grid
                            item
                            sm={7}
                            md={9}
                            spacing={5}
                            container
                            direction='column'
                            // justify='center'
                            alignItems='center'>
                            <Grid item>
                                <HourlyForecast />
                            </Grid>
                            <Grid item>
                                <DailyForecast />
                            </Grid>
                            <Grid item container direction='row' spacing={3}>
                                <Grid item>
                                    <Humidity />
                                </Grid>
                                <Grid item>
                                    <Visibility />
                                </Grid>
                                <Grid item>
                                    <Wind />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Root>
                </div>
            </ThemeProvider>
        </LocationStore.Provider>
    );
}

export default App;
