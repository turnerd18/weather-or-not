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

export const fetchRelation = (relationUrl) =>
    fetch(relationUrl, { headers: defaultHeaders });

export const fetchStationObservations = (stationUrl) =>
    fetch(`${stationUrl}/observations/latest?require_qc=true`, {
        headers: defaultHeaders,
    });
