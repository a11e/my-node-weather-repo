const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()

const publicDirPath = path.join(__dirname, '../public')

app.use(express.static(publicDirPath))


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send('no search provided')
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an adress'
        })
    }

    geocode(req.query.address, (err, { lat, long, location } = {}) => {
        if (err) {
            return res.send('unable to connect to service')
        } else {
            forecast(lat, long, (error, forecastData) => {
                if (error) {
                    return res.send('unable to connect to service')
                }
                else {
                    res.send({
                        forecast: forecastData,
                        address: req.query.address,
                        location

                    })
                }
            })



        }

    })



})


app.listen(5500)