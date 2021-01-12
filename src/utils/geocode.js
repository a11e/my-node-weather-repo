const request = require('request')
const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?&access_token=pk.eyJ1IjoiZGFydGVyMTgiLCJhIjoiY2tqbjNpOHczMmp3OTJybzcycXNvaHo0MSJ9.EiVu1tYW1uHoq3q-GU4ksA'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('geocode: unable to connect to service', undefined)
        } else if (body.features.length === 0) {
            callback('geocode: unable to find location', undefined)

        } else {
            callback(undefined, {
                lat: body.features[1].center[1],
                long: body.features[1].center[0],
                location: body.features[0].place_name

            })
        }
    })
}

module.exports = geocode