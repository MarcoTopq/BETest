'use strict'
const Sequelize = require('sequelize');
const db = require('../bin/index')
const Location = db.define('m_location', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  location_name: {
    type: Sequelize.STRING,
  },
  Latitude: {
    type: Sequelize.STRING,
  },
  Longitude: {
    type: Sequelize.STRING,
  },
  nearest_location: {
    type: Sequelize.STRING,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
  isDeleted: Sequelize.TINYINT,
});

Location.sync();

module.exports = Location;