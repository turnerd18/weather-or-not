import { createActions, handleActions } from "redux-actions";
import { createContext } from "react";

export const { fetching, fetchFailed, fetchCompleted } = createActions(
    "FETCHING",
    "FETCH_FAILED",
    "FETCH_COMPLETED"
);

export const { setLocation, setWeatherGrid, setCurrentWeather } = createActions(
    {
        SET_LOCATION: (location) => ({ location }),
        SET_WEATHER_GRID: (weatherGrid) => ({ weatherGrid }),
        SET_CURRENT_WEATHER: (currentWeather) => ({ currentWeather }),
    }
);

export const loadingState = Object.freeze({
    READY_TO_LOAD: "READY_TO_LOAD",
    LOAD_FAILED: "LOAD_FAILED",
    LOADED: "LOADED",
    LOADING: "LOADING",
});

export const initialState = Object.freeze({
    location: { label: "" },
    weatherGrid: null,
    currentWeather: null,
});

export const reducer = handleActions({
    [setLocation]: (_, { payload: { location } }) => ({
        location,
        loadState: loadingState.READY_TO_LOAD,
    }),
    [setWeatherGrid]: (state, { payload: { weatherGrid } }) => ({
        ...state,
        weatherGrid,
    }),
    [setCurrentWeather]: (state, { payload: { currentWeather } }) => ({
        ...state,
        currentWeather,
    }),
    [fetching]: (state) => ({
        ...state,
        loadState: loadingState.LOADING,
    }),
    [fetchCompleted]: (state) => ({
        ...state,
        loadState: loadingState.LOADED,
    }),
    [fetchFailed]: (state) => ({
        ...state,
        loadState: loadingState.LOAD_FAILED,
    }),
}, initialState);

export const LocationStore = createContext();
