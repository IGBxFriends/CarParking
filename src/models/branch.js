const mongoose = require('mongoose');
const dbConnection = require('../services/database');

const BranchSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: Boolean,
    },
	address: {
        type: String,
        required: Boolean,
    },
	parkingSpace: {
        type: Number,
        required: Boolean,
    },
    freeSpace: {
        type: Number,
        required: true,
    },
    register: {
        type: String,
        required: Boolean,
    }    
});

const Branch = mongoose.model('Branch', BranchSchema, 'Branchs');


module.exports = Branch;