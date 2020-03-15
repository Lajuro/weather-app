const request = require('request');
const apiKey = '37076c4e876d3ad49ea29ec421b1514f';

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}?units=si`;

    request({url, json: true}, (error, {body}) => {
        const {daily, currently, timezone} = body;
        const {summary} = daily;
        const {temperature, precipProbability} = currently;

        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location!', undefined);
        } else {
            callback(undefined, {
                summary,
                temperature,
                precipProbability,
                message: `${summary}\nIt is currently ${temperature}°C degree out there. There is a ${precipProbability}% chance of rain. The timezone is ${timezone}.`,
                url
            });
        }
    });
};

module.exports = forecast;