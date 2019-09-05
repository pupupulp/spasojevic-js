const positiveData = require('./data/positive');
const negativeData = require('./data/negative');
const neutralData = require('./data/neutral');

module.exports.data = [
    ...positiveData,
    ...negativeData,
    ...neutralData
];