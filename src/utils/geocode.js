const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(address)}.json?access_token=pk.eyJ1IjoibGFqdXJvIiwiYSI6ImNrNzlzdG9rMTAwZmczZnBhMTJyM2pybW0ifQ.HduLVCsYIKRkivjkWGIUiA`;

    request({url, json: true}, (error, {body}) => {

        const {features = [], query} = body;

        if (error) {
            return callback('Unable to connect to location services!', undefined);
        } else if (features.length === 0) {
            callback(`There is no location found for '${query}'!`, undefined);
        } else {
            const {geometry, place_name} = features[0];
            callback(undefined, {
                latitude: geometry.coordinates[1],
                longitude: geometry.coordinates[0],
                location: place_name
            })
        }
    });
};

module.exports = geocode;