import React, { useReducer } from "react";
// import logo from "./logo.svg";
import LocationSearch from "./LocationSearch";
import theme from "../theme";
import { ThemeProvider, Grid } from "@material-ui/core";
import {
    LocationStore,
    reducer as locationReducer,
    fetchingWeatherGrid,
    setLocation,
    fetchWeatherGridFailed,
    fetchedWeatherGrid,
} from "../locationStore";
import CurrentTemperature from "./CurrentTemperature";
import { fetchGridPoints } from "../weatherApi";

function App() {
    const [locationState, dispatch] = useReducer(locationReducer, {
        location: { label: "" },
    });

    const onLocationChanged = async (location) => {
        dispatch(setLocation(location))
        dispatch(fetchingWeatherGrid());
        let weatherGrid;
        try {
            weatherGrid = await fetchGridPoints(location.coordinates.latitude, location.coordinates.longitude);
        } catch (error) {
            dispatch(fetchWeatherGridFailed());
            return;
        }

        console.log(weatherGrid);
        dispatch(fetchedWeatherGrid(weatherGrid));
    };

    return (
        <LocationStore.Provider value={locationState}>
            <ThemeProvider theme={theme}>
                <Grid container spacing={3}>
                    <Grid
                        item
                        sm={5}
                        md={3}
                        container
                        spacing={3}
                        direction='column'
                        justify='center'
                        alignItems='center'>
                        <Grid item>
                            <LocationSearch onChanged={onLocationChanged} />
                        </Grid>
                        <Grid item>
                            <CurrentTemperature />
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        sm={7}
                        md={9}
                        container
                        direction='column'
                        justify='center'
                        alignItems='center'>
                        <LocationStore.Consumer>
                            {(location) => <h1>{location.label}</h1>}
                        </LocationStore.Consumer>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </LocationStore.Provider>
    );
}

export default App;
