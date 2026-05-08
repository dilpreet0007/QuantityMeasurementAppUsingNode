USE quantity_measurement;

CREATE TABLE quantity_measurements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    operation_type VARCHAR(50),
    unit_type VARCHAR(50),
    value1 DOUBLE,
    unit1 VARCHAR(50),
    value2 DOUBLE,
    unit2 VARCHAR(50),
    result_value DOUBLE,
    result_unit VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);