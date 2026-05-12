const {
    LENGTH_UNITS,
    WEIGHT_UNITS,
    VOLUME_UNITS
} = require('../models/units');

function convertLength(value, from, to) {

    const meters = value * LENGTH_UNITS[from];

    return meters / LENGTH_UNITS[to];
}

function convertWeight(value, from, to) {

    const grams = value * WEIGHT_UNITS[from];

    return grams / WEIGHT_UNITS[to];
}

function convertVolume(value, from, to) {

    const liters = value * VOLUME_UNITS[from];

    return liters / VOLUME_UNITS[to];
}

function convertTemperature(value, from, to) {

    if (from === 'celsius' && to === 'fahrenheit') {
        return (value * 9/5) + 32;
    }

    if (from === 'fahrenheit' && to === 'celsius') {
        return (value - 32) * 5/9;
    }

    return value;
}

module.exports = {
    convertLength,
    convertWeight,
    convertVolume,
    convertTemperature
};