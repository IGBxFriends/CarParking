const mongoose = require('mongoose');
const dbConnection = require('../services/database');

const CarParkSchema = new mongoose.Schema({    
	board: { type: String, required: Boolean },
	idClient: { type: String, required: Boolean },
	idBranch: { type: String, required: Boolean },
	startTime: { type: String , required: Boolean },
	endTime: { type: String, required: Boolean },
	price: { type: String, required: Boolean },
	status: { type: String, required: Boolean }

});

const carPark = mongoose.model('CarPark', CarParkSchema, 'CarParks' );

module.exports = carPark;

