const HttpError = require('../models/http-error')

let DUMMY_PLACES = [
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

const getPlacesByUserId = (req, res, next) => {
    const userId = req.params.uid
    console.log(req.params)
    const places = DUMMY_PLACES.filter(p => {
        return p.creator === userId
    })

    if (!places || places.length === 0) {
        return next(new HttpError('Could not find a places for provided user id', 404))
    }

    res.json({places})
}

const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid // {pid:'p1'}
    const place = DUMMY_PLACES.find(p => {
        // find() compare id and return result
        return p.id === placeId
    })

    if (!place) {

        return next(new HttpError('Could not find a places for provided user id', 404))

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
    res.status(201).json({ place: createPlace })
}

const updatePlace = (req, res, next) => {
    const { title, description } = req.body
    const placeId = req.params.pid

    // make a copy of update place
    const updatedplace = { ...DUMMY_PLACES.find(p => p.id === placeId) }

    // get the place index
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId)

    // Update the value
    updatedplace.title = title;
    updatedplace.description = description;

    // replace the old place with the new copy by DUMMY_PLACES index
    DUMMY_PLACES[placeIndex] = updatedplace

    res.status(201).json({ place: updatedplace })
}

const deletePlace = (req, res, next) => {
    const placeId = req.params.pid
    DUMMY_PLACES = DUMMY_PLACES.filter(p=> p.id !== placeId )
    res.status(201).json({'message':'deleted place.',
place:DUMMY_PLACES})
}


exports.getPlaceById = getPlaceById
exports.getPlacesByUserId = getPlacesByUserId
exports.createPlace = createPlace
exports.updatePlace = updatePlace
exports.deletePlace = deletePlace
