const {
    LengthUnit,
    VolumeUnit,
    WeightUnit,
    TemperatureUnit
} = require('../models/units');

function validateQuantity(quantity) {
    if (!quantity) {
        throw new Error('Quantity cannot be null');
    }

    if (
        quantity.value === undefined ||
        quantity.unit === undefined ||
        quantity.measurementType === undefined
    ) {
        throw new Error('value, unit and measurementType are required');
    }
}

function validateMeasurementTypes(q1, q2) {
    if (q1.measurementType !== q2.measurementType) {
        throw new Error('Invalid Measurement Type');
    }
}

function resolveUnit(quantity) {
    const { unit, measurementType } = quantity;

    if (measurementType === 'LengthUnit') {
        if (!LengthUnit[unit]) throw new Error('Invalid Unit');
        return LengthUnit[unit];
    }

    if (measurementType === 'VolumeUnit') {
        if (!VolumeUnit[unit]) throw new Error('Invalid Unit');
        return VolumeUnit[unit];
    }

    if (measurementType === 'WeightUnit') {
        if (!WeightUnit[unit]) throw new Error('Invalid Unit');
        return WeightUnit[unit];
    }

    if (measurementType === 'TemperatureUnit') {
        if (!TemperatureUnit[unit]) throw new Error('Invalid Unit');
        return TemperatureUnit[unit];
    }

    throw new Error('Invalid Measurement Type');
}

function round(value) {
    return Math.round(value * 1000) / 1000;
}

function convertTemperature(fromUnit, value, toUnit) {
    if (fromUnit === toUnit) {
        return value;
    }

    if (fromUnit === 'FAHRENHEIT' && toUnit === 'CELSIUS') {
        return (value - 32) * 5 / 9;
    }

    if (fromUnit === 'CELSIUS' && toUnit === 'FAHRENHEIT') {
        return (value * 9 / 5) + 32;
    }

    throw new Error('Unsupported temperature conversion');
}

function convertTo(q1, q2) {
    validateQuantity(q1);
    validateQuantity(q2);
    validateMeasurementTypes(q1, q2);

    if (q1.measurementType === 'TemperatureUnit') {
        const result = convertTemperature(q1.unit, q1.value, q2.unit);

        return {
            value: round(result),
            unit: q2.unit,
            measurementType: q2.measurementType
        };
    }

    const unit1 = resolveUnit(q1);
    const unit2 = resolveUnit(q2);

    const baseValue = q1.value * unit1;
    const result = baseValue / unit2;

    return {
        value: round(result),
        unit: q2.unit,
        measurementType: q2.measurementType
    };
}

function compare(q1, q2) {
    const converted = convertTo(q2, q1);

    const isEqual = round(q1.value) === round(converted.value);

    return {
        resultText: isEqual ? 'Equal' : 'Not Equal'
    };
}

function validateArithmetic(q1, q2) {
    validateQuantity(q1);
    validateQuantity(q2);
    validateMeasurementTypes(q1, q2);

    if (
        q1.measurementType === 'TemperatureUnit' ||
        q2.measurementType === 'TemperatureUnit'
    ) {
        throw new Error('Arithmetic not supported for temperature');
    }
}

function convertToBase(quantity) {
    const unitFactor = resolveUnit(quantity);

    return quantity.value * unitFactor;
}

function executeArithmetic(operation, q1, q2, targetQuantity) {
    validateArithmetic(q1, q2);

    const baseValue1 = convertToBase(q1);
    const baseValue2 = convertToBase(q2);

    let resultBaseValue;

    if (operation === 'ADD') {
        resultBaseValue = baseValue1 + baseValue2;
    } else if (operation === 'SUBTRACT') {
        resultBaseValue = baseValue1 - baseValue2;
    } else if (operation === 'DIVIDE') {
        if (baseValue2 === 0) {
            throw new Error('Division by zero');
        }

        return {
            value: round(baseValue1 / baseValue2),
            unit: 'NONE',
            measurementType: 'DIMENSIONLESS'
        };
    } else {
        throw new Error('Invalid operation');
    }

    const target = targetQuantity || q1;

    validateQuantity(target);

    const targetFactor = resolveUnit(target);

    return {
        value: round(resultBaseValue / targetFactor),
        unit: target.unit,
        measurementType: target.measurementType
    };
}

function add(q1, q2, targetQuantity) {
    return executeArithmetic('ADD', q1, q2, targetQuantity);
}

function subtract(q1, q2, targetQuantity) {
    return executeArithmetic('SUBTRACT', q1, q2, targetQuantity);
}

function divide(q1, q2) {
    return executeArithmetic('DIVIDE', q1, q2);
}

module.exports = {
    compare,
    convertTo,
    add,
    subtract,
    divide
};