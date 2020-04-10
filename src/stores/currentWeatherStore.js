import { createContext } from "react";
import { createActions, handleActions } from "redux-actions";
import loadingState from "./loadingState";

export const {
    fetchingCurrentWeather,
    fetchedCurrentWeather,
    fetchCurrentWeatherFailed,
} = createActions({
    FETCHING_CURRENT_WEATHER: () => {},
    FETCHED_CURRENT_WEATHER: (currentWeather) => ({ currentWeather }),
    FETCH_CURRENT_WEATHER_FAILED: () => {},
});

export const currentWeatherReducer = handleActions(
    {
        [fetchingCurrentWeather]: (state) => ({
            ...state,
            loadingState: loadingState.LOADING,
        }),
        [fetchedCurrentWeather]: (state, { payload: { currentWeather } }) => ({
            ...state,
            loadingState: loadingState.LOADED,
            currentWeather,
        }),
        [fetchCurrentWeatherFailed]: (state) => ({
            ...state,
            loadingState: loadingState.LOAD_FAILED,
        }),
    },
    {
        loadingState: loadingState.READY_TO_LOAD,
        currentWeather: null,
    }
);

export const CurrentWeatherStore = createContext();
