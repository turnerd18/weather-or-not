const baseUrl = "https://api.weather.gov";
const defaultHeaders = {
    "User-Agent": "localhost",
};

export const fetchGridPoints = async (latitude, longitude) => {
    const data = await fetch(`${baseUrl}/points/${latitude},${longitude}`, {
        headers: defaultHeaders,
    });
    return await data.json();
};

export const fetchRelation = async (relationUrl) => {
    const response = await fetch(relationUrl, { headers: defaultHeaders });
    return await response.json();
};

export const fetchStationObservations = async (stationUrl) => {
    const response = await fetch(
        `${stationUrl}/observations/latest?require_qc=true`,
        {
            headers: defaultHeaders,
        }
    );

    return await response.json();
};
