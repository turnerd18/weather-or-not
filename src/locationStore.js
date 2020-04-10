import React from "react";
import { createActions, handleActions } from "redux-actions";

export const {
    setLocation,
    fetchingWeatherGrid,
    fetchedWeatherGrid,
    fetchWeatherGridFailed,
} = createActions({
    SET_LOCATION: (location) => ({ location }),
    FETCHING_WEATHER_GRID: () => {},
    FETCHED_WEATHER_GRID: (weatherGrid) => ({ weatherGrid }),
    FETCH_WEATHER_GRID_FAILED: () => {},
});

export const loadingState = Object.freeze({
    READY_TO_LOAD: "READY_TO_LOAD",
    LOAD_FAILED: "LOAD_FAILED",
    LOADED: "LOADED",
    LOADING: "LOADING",
});

export const reducer = handleActions(
    {
        [setLocation]: (_, { payload: { location } }) => ({
            location,
            loadingState: loadingState.READY_TO_LOAD,
        }),
        [fetchingWeatherGrid]: (state) => ({
            ...state,
            loadingState: loadingState.LOADING,
        }),
        [fetchedWeatherGrid]: (state, { payload: { weatherGrid } }) => ({
            ...state,
            loadingState: loadingState.LOADED,
            weatherGrid,
        }),
        [fetchWeatherGridFailed]: (state) => ({
            ...state,
            loadingState: loadingState.LOAD_FAILED,
        }),
    },
    { location: { label: "" } }
);

export const LocationStore = React.createContext();
