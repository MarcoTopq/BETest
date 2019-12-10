'use strict'
let Location = require('../models/location');

const create = async (req, res) => {
    let body = req.body;
    await Location.create({
        location_name: body.location_name,
        Latitude: body.Latitude,
        Longitude: body.Longitude
    })
        .then(data => (res.json(data)))
        .catch(err => res.status(400).json(err))
}

const add = async (req, res) => {
    let Id = req.params.id;
    let body = req.body;
    await Location.findOne({
        where: {
            id: Id
        }
    })
        .then(data => {
            if (!data) {
                return res.json("Location not found");
            }
            else {
                Location.update({
                    nearest_location: body.nearest_location,
                }, {
                    where: {
                        id: Id
                    }
                })
            }
        })
        .then(Location.findOne({
            where: {
                id: Id
            }
        }).then(data => (res.json(data))))
        .catch(err => res.status(400).json(err))
}

const getAll = async (req, res) => {
    await Location.findAll()
        .then(data => (res.json(data)))
        .catch(err => res.status(400).json(err))
}

const find = async (req, res) => {
    let Id = req.params.id;
    await Location.findOne({
        where: {
            id: Id
        }
    })
        .then(data => {
            if (!data) {
                return res.json("Location not found");
            }
            else {
                return res.json(data);
            }
        })
        .catch(err => res.status(400).json(err))
}

const update = async (req, res) => {
    let Id = req.params.id;
    let body = req.body;
    await Location.findOne({
        where: {
            id: Id
        }
    })
        .then(async data => {
            if (!data) {
                return res.json("Location not found");
            }
            else {
                await Location.update({
                    location_name: body.location_name,
                    Latitude: body.Latitude,
                    Longitude: body.Longitude
                }, {
                    where: {
                        id: Id
                    }
                })
            }
        }).catch(err => res.status(400).json(err))
    Location.findOne({
        where: {
            id: Id
        }
    }).then(data => (res.json(data)))
}

const deleted = async (req, res) => {
    let Id = req.params.id;
    await Location.update({
        isDelete: true
    }, {
        where: {
            id: Id
        }
    });
    await Location.destroy({
        where: {
            id: Id
        }
    })
        .then(res.json("Location was remove"))
        .catch(err => res.status(400).json(err))
}

module.exports = {
    create,
    getAll,
    find,
    add,
    update,
    deleted
}