import React, { useEffect, useState } from "react";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import { GpsFixed, Search } from "@material-ui/icons";
import { LocationStore, loadingState } from "../stores/locationStore";

export default ({ onChanged }) => {
    const [geoLocationIsAvailable, setGeoLocationIsAvailable] = useState(
        !!navigator.geolocation
    );

    useEffect(() => {
        const autocomplete = new window.google.maps.places.Autocomplete(
            document.getElementById("location-autocomplete"),
            {
                types: ["(regions)"],
            }
        );

        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            onChanged({
                label: place.formatted_address,
                coordinates: {
                    latitude: place.geometry.location.lat(),
                    longitude: place.geometry.location.lng(),
                },
            });
        });
    }, [onChanged]);

    const updateGeoLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                ({ coords: { latitude, longitude } }) =>
                    onChanged({
                        label: `${latitude}, ${longitude}`,
                        coordinates: { latitude, longitude },
                    }),
                () => setGeoLocationIsAvailable(false)
            );
        }
    };

    // useEffect(updateGeoLocation, [onChanged]);

    return (
        <LocationStore.Consumer>
            {(locationState) => (
                <TextField
                    id='location-autocomplete'
                    // label='Search for location'
                    placeholder='Search for location'
                    variant='outlined'
                    fullWidth
                    autoFocus
                    disabled={
                        locationState.loadState === loadingState.LOADING
                    }
                    InputProps={{
                        startAdornment: (
                            <InputAdornment>
                                <Search />
                            </InputAdornment>
                        ),
                        endAdornment: geoLocationIsAvailable && (
                            <InputAdornment position='end'>
                                                <IconButton
                  aria-label="toggle password visibility"
                  onClick={updateGeoLocation}
                >

                                <GpsFixed />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            )}
        </LocationStore.Consumer>
    );
};
