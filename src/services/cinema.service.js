const { Cinema } = require('../models');

const CinemaService = module.exports;

CinemaService.list = () => Cinema.findAll();
