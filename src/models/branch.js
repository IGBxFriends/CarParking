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
	vagas: {
        type: Number,
        required: Boolean,
    }
});

const Branch = mongoose.model('Branch', BranchSchema, 'Branchs');


module.exports = Branch;