const mongoose = require('mongoose');
const consumptionSchema = new mongoose.Schema({
  codeFood:{type: String, required: true},
  typeFood:{type: String, required: true},
  nameFood:{type: String,required:true},
  codeStudent:{type: String,required:true},
  createdAt: {type: Date, default: Date.now}
  });

  module.exports = {consumptionSchema}