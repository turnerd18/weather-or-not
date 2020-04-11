import cloud from "./weatherIcons/duoyun.png";
import thunder from "./weatherIcons/leizhengyu.png";
import snow from "./weatherIcons/daxue.png";
import rain from "./weatherIcons/zhongyu.png";
import sunny from "./weatherIcons/qing.png";

const termsMapping = [
    [["snow", "ice", "hail"], snow],
    [["thunder", "lightning"], thunder],
    [["rain"], rain],
    [["cloud"], cloud],
    [["sun", "clear"], sunny],
];

export const mapForecastToImage = (forecast) => {
    const lowerForecast = forecast.toLowerCase();
    for (const [terms, image] of termsMapping) {
        if (terms.some((term) => lowerForecast.includes(term))) {
            return image;
        }
    }

    return sunny;
};
