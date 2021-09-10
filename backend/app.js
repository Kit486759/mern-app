const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const placesRoutes = require('./routes/places.route');
const usersRoutes = require('./routes/users.route');

app.use(bodyParser.json());

app.use('/api/places', placesRoutes) //=> /api/places/...


// This is error middleware in expressjs
app.use((error, req, res, next) => {

    if (res.headerSent) {
        return next(error)
    }
    // if error code not set, set it 500
    res.status(error.code || 500)
    res.json({message:error.message || 'An unknown error occurred'})
})

app.listen(5000)