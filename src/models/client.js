const mongoose = require('mongoose');
const { uuid } = require('uuidv4');
const dbConnection = require('../services/database');

const ClientSchema = new mongoose.Schema({
    id: { type: String, required: Boolean },
    Name: { type: String, required: Boolean },
	phone: { type: String, required: Boolean }
});

const Client = mongoose.model('Client',ClientSchema, 'Clients');

module.exports = Client; 