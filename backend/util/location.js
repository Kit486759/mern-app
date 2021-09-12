require('dotenv').config({ path: '../.env' })
const axios = require('axios')
const HttpError = require('../models/http-error')

const API_KEY = process.env.GOOGLE_API_KEY

async function getCoordForAddress(address) {

    // DUMMY data
    // return {
    //     lat: 40.7484474,
    //     lng: -73.9871516
    // }

    // encodeURIComponent() make string to url friend
    const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`)
    const data = res.data
    console.log(data)
    if (!data || data.status === 'ZERO_RESULTS') {
        throw new HttpError('Could not find location for the specified address', 404)
    }

    const coordinates = data.results[0].geometry.location;

    return coordinates
}

module.exports = getCoordForAddress