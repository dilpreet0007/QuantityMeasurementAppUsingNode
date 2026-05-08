const {
    performConversion,
    addValues,
    subtractValues
} = require('../services/quantityService');

const {
    saveMeasurement,
    getAllMeasurements
} = require('../models/quantityModel');

async function convertQuantity(req, res) {

    try {

        const { type, value, fromUnit, toUnit } = req.body;

        const result = performConversion(
            type,
            value,
            fromUnit,
            toUnit
        );

        await saveMeasurement({
            operation_type: 'conversion',
            unit_type: type,
            value1: value,
            unit1: fromUnit,
            value2: null,
            unit2: null,
            result_value: result,
            result_unit: toUnit
        });

        res.status(200).json({
            success: true,
            result
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function addQuantity(req, res) {

    try {

        const { value1, value2, unit } = req.body;

        const result = addValues(value1, value2);

        await saveMeasurement({
            operation_type: 'addition',
            unit_type: unit,
            value1,
            unit1: unit,
            value2,
            unit2: unit,
            result_value: result,
            result_unit: unit
        });

        res.status(200).json({
            success: true,
            result,
            unit
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function subtractQuantity(req, res) {

    try {

        const { value1, value2, unit } = req.body;

        const result = subtractValues(value1, value2);

        await saveMeasurement({
            operation_type: 'subtraction',
            unit_type: unit,
            value1,
            unit1: unit,
            value2,
            unit2: unit,
            result_value: result,
            result_unit: unit
        });

        res.status(200).json({
            success: true,
            result,
            unit
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function getHistory(req, res) {

    try {

        const data = await getAllMeasurements();

        res.status(200).json({
            success: true,
            data
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    convertQuantity,
    addQuantity,
    subtractQuantity,
    getHistory
};