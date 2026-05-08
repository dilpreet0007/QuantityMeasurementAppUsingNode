const quantityService = require('../services/quantityService');

const {
    saveMeasurement,
    getAllMeasurements,
    getOperationHistory,
    getMeasurementsByType,
    getOperationCount,
    getErrorHistory
} = require('../models/quantityModel');

function buildSuccessRecord(operation, input, result, resultText = null) {
    return {
        operation,

        this_value: input.thisQuantityDTO.value,
        this_unit: input.thisQuantityDTO.unit,
        this_measurement_type: input.thisQuantityDTO.measurementType,

        that_value: input.thatQuantityDTO.value,
        that_unit: input.thatQuantityDTO.unit,
        that_measurement_type: input.thatQuantityDTO.measurementType,

        result_value: result ? result.value : null,
        result_unit: result ? result.unit : null,
        result_measurement_type: result ? result.measurementType : null,
        result_text: resultText,

        is_error: false,
        error_message: null
    };
}

function buildErrorRecord(operation, input, errorMessage) {
    return {
        operation,

        this_value: input?.thisQuantityDTO?.value || null,
        this_unit: input?.thisQuantityDTO?.unit || null,
        this_measurement_type: input?.thisQuantityDTO?.measurementType || null,

        that_value: input?.thatQuantityDTO?.value || null,
        that_unit: input?.thatQuantityDTO?.unit || null,
        that_measurement_type: input?.thatQuantityDTO?.measurementType || null,

        result_value: null,
        result_unit: null,
        result_measurement_type: null,
        result_text: null,

        is_error: true,
        error_message: errorMessage
    };
}

async function handleOperation(req, res, operation, serviceFunction) {
    try {
        const input = req.body;

        const result = serviceFunction(input);

        let resultText = null;

        if (operation === 'COMPARE') {
            resultText = result.resultText;
        }

        await saveMeasurement(
            buildSuccessRecord(
                operation,
                input,
                operation === 'COMPARE' ? null : result,
                resultText
            )
        );

        res.status(200).json({
            success: true,
            operation,
            result: operation === 'COMPARE' ? resultText : result
        });

    } catch (error) {
        await saveMeasurement(
            buildErrorRecord(operation, req.body, error.message)
        );

        res.status(400).json({
            success: false,
            error: true,
            message: error.message
        });
    }
}

async function compareQuantity(req, res) {
    return handleOperation(req, res, 'COMPARE', input =>
        quantityService.compare(
            input.thisQuantityDTO,
            input.thatQuantityDTO
        )
    );
}

async function convertQuantity(req, res) {
    return handleOperation(req, res, 'CONVERT', input =>
        quantityService.convertTo(
            input.thisQuantityDTO,
            input.thatQuantityDTO
        )
    );
}

async function addQuantity(req, res) {
    return handleOperation(req, res, 'ADD', input =>
        quantityService.add(
            input.thisQuantityDTO,
            input.thatQuantityDTO,
            input.targetQuantityDTO
        )
    );
}

async function addQuantityWithTargetUnit(req, res) {
    return addQuantity(req, res);
}

async function subtractQuantity(req, res) {
    return handleOperation(req, res, 'SUBTRACT', input =>
        quantityService.subtract(
            input.thisQuantityDTO,
            input.thatQuantityDTO,
            input.targetQuantityDTO
        )
    );
}

async function subtractQuantityWithTargetUnit(req, res) {
    return subtractQuantity(req, res);
}

async function divideQuantity(req, res) {
    return handleOperation(req, res, 'DIVIDE', input =>
        quantityService.divide(
            input.thisQuantityDTO,
            input.thatQuantityDTO
        )
    );
}

async function getAllHistory(req, res) {
    const data = await getAllMeasurements();

    res.status(200).json({
        success: true,
        data
    });
}

async function getHistoryByOperation(req, res) {
    const { operation } = req.params;

    const data = await getOperationHistory(operation.toUpperCase());

    res.status(200).json({
        success: true,
        data
    });
}

async function getHistoryByType(req, res) {
    const { type } = req.params;

    const data = await getMeasurementsByType(type);

    res.status(200).json({
        success: true,
        data
    });
}

async function getCountByOperation(req, res) {
    const { operation } = req.params;

    const count = await getOperationCount(operation.toUpperCase());

    res.status(200).json({
        success: true,
        operation: operation.toUpperCase(),
        count
    });
}

async function getErroredOperations(req, res) {
    const data = await getErrorHistory();

    res.status(200).json({
        success: true,
        data
    });
}

module.exports = {
    compareQuantity,
    convertQuantity,
    addQuantity,
    addQuantityWithTargetUnit,
    subtractQuantity,
    subtractQuantityWithTargetUnit,
    divideQuantity,
    getAllHistory,
    getHistoryByOperation,
    getHistoryByType,
    getCountByOperation,
    getErroredOperations
};