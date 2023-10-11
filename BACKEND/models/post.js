const mongoose = require('mongoose')

const joi = require('joi')

const postschema = new mongoose.Schema({
    deparment: String,
    name: String

})