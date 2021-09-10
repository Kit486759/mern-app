const HttpError = require('../models/http-error')

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: ' One of the most famous sky scrapers in the world!',
        location: {
            lat: 40.7484474,
            lng: -73.9871516
        },
        address: '20 W 34th St, New York, NY 10001',
        creator: 'u1'
    },
]

const getPlaceByUserId = (req, res, next) => {
    const userId = req.params.uid
    console.log(req.params)
    const place = DUMMY_PLACES.find(p => {
        return p.creator === userId
    })

    if (!place) {
        return next(new HttpError('Could not find a place for provided user id', 404))
    }

    res.json({ place })
}

const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid // {pid:'p1'}
    const place = DUMMY_PLACES.find(p => {
        // find() compare id and return result
        return p.id === placeId
    })

    if (!place) {

        return next(new HttpError('Could not find a place for provided user id', 404))

        // ===== basic way to respon 404
        // return res.status(404)
        //     .json({ message: 'Could not find a place for provided id' })

        // ===== advance way to respon 404
        // const error = new Error('Could not find a place for provided id')
        // error.code = 404
        // return next(error);
    }
    res.json({ place })
}

const createPlace = (req, res, next) => {
    const { title, description, coordinates, address, creator } = req.body;
    const createPlace = {
        title,
        description,
        location: coordinates,
        address,
        creator
    }
    DUMMY_PLACES.push(createPlace)

    // created sucessful code 201
    res.status(201).json({place:createPlace})
}

exports.getPlaceById = getPlaceById
exports.getPlaceByUserId = getPlaceByUserId
exports.createPlace = createPlace
