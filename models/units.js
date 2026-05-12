const LengthUnit = {
    INCHES: 1.0,
    FEET: 12.0,
    YARDS: 36.0,
    CENTIMETERS: 1.0 / 2.54
};

const VolumeUnit = {
    LITRE: 1.0,
    MILLILITER: 0.001,
    GALLON: 3.78541
};

const WeightUnit = {
    GRAM: 1.0,
    KILOGRAM: 1000.0,
    MILLIGRAM: 0.001,
    POUND: 453.592,
    TONNE: 1000000.0
};

const TemperatureUnit = {
    CELSIUS: 'CELSIUS',
    FAHRENHEIT: 'FAHRENHEIT'
};

module.exports = {
    LengthUnit,
    VolumeUnit,
    WeightUnit,
    TemperatureUnit
};