const {
    convertLength,
    convertWeight,
    convertVolume,
    convertTemperature
} = require('../utils/conversionHelper');

function performConversion(type, value, from, to) {

    switch (type) {

        case 'length':
            return convertLength(value, from, to);

        case 'weight':
            return convertWeight(value, from, to);

        case 'volume':
            return convertVolume(value, from, to);

        case 'temperature':
            return convertTemperature(value, from, to);

        default:
            throw new Error('Invalid conversion type');
    }
}

function addValues(a, b) {
    return a + b;
}

function subtractValues(a, b) {
    return a - b;
}

module.exports = {
    performConversion,
    addValues,
    subtractValues
};