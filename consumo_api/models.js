const mongoose = require('mongoose');
const { consumptionSchema } = require('./schemas');

const consumptionModel = mongoose.model('consumption', consumptionSchema);

module.exports = {consumptionModel };