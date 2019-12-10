'use strict'
let express = require('express');
let router = express.Router();
let expressJoi = require('express-joi-validator');
let Joi = require('joi');
let LocController = require('../controller/location');

let bodySchema = {
    body: {
        location_name: Joi.string().required(),
        Latitude: Joi.string().required(),
        Longitude: Joi.string().required(),
    }
};

let addSchema = {
    body: {
        nearest_location: Joi.string().allow(""),
    }
};

let updateSchema = {
    body: {
        location_name: Joi.string().allow(""),
        Latitude: Joi.string().allow(""),
        Longitude: Joi.string().allow(""),
        nearest_location: Joi.string().allow(""),
    }
};

router.post('/', expressJoi(bodySchema), LocController.create);

router.post('/nearest/:id', expressJoi(addSchema), LocController.add);

router.get('/', LocController.getAll)

router.get('/:id', LocController.find);

router.put('/nearest/:id', expressJoi(addSchema), LocController.add);

router.put('/:id', expressJoi(updateSchema), LocController.update);

router.delete('/:id', LocController.deleted);

module.exports = router;