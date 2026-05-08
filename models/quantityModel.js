const db = require('../config/db');

async function saveMeasurement(data) {
    const sql = `
        INSERT INTO quantity_measurements (
            operation,

            this_value,
            this_unit,
            this_measurement_type,

            that_value,
            that_unit,
            that_measurement_type,

            result_value,
            result_unit,
            result_measurement_type,
            result_text,

            is_error,
            error_message
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        data.operation,

        data.this_value,
        data.this_unit,
        data.this_measurement_type,

        data.that_value,
        data.that_unit,
        data.that_measurement_type,

        data.result_value,
        data.result_unit,
        data.result_measurement_type,
        data.result_text,

        data.is_error || false,
        data.error_message || null
    ];

    const [result] = await db.execute(sql, values);

    return result;
}

async function getAllMeasurements() {
    const [rows] = await db.execute(
        'SELECT * FROM quantity_measurements ORDER BY created_at DESC'
    );

    return rows;
}

async function getOperationHistory(operation) {
    const [rows] = await db.execute(
        'SELECT * FROM quantity_measurements WHERE operation = ? ORDER BY created_at DESC',
        [operation]
    );

    return rows;
}

async function getMeasurementsByType(type) {
    const [rows] = await db.execute(
        'SELECT * FROM quantity_measurements WHERE this_measurement_type = ? ORDER BY created_at DESC',
        [type]
    );

    return rows;
}

async function getOperationCount(operation) {
    const [rows] = await db.execute(
        'SELECT COUNT(*) AS count FROM quantity_measurements WHERE operation = ? AND is_error = false',
        [operation]
    );

    return rows[0].count;
}

async function getErrorHistory() {
    const [rows] = await db.execute(
        'SELECT * FROM quantity_measurements WHERE is_error = true ORDER BY created_at DESC'
    );

    return rows;
}

module.exports = {
    saveMeasurement,
    getAllMeasurements,
    getOperationHistory,
    getMeasurementsByType,
    getOperationCount,
    getErrorHistory
};