const db = require('../config/db');

async function saveMeasurement(data) {

    const sql = `
        INSERT INTO quantity_measurements (
            operation_type,
            unit_type,
            value1,
            unit1,
            value2,
            unit2,
            result_value,
            result_unit
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        data.operation_type,
        data.unit_type,
        data.value1,
        data.unit1,
        data.value2,
        data.unit2,
        data.result_value,
        data.result_unit
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

module.exports = {
    saveMeasurement,
    getAllMeasurements
};