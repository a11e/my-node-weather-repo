const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a294c404f5cf0e3dbada585c3d0ed1ef&query=' + lat + ',' + long
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('forecast: unable to connect to service ', undefined)
        } else if (body.error) {
            callback('forecast: unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ', it is currenlty ' + body.current.temperature + ' degrees out, humidity ' + body.current.humidity)
        }

    })

}
module.exports = forecast

