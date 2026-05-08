CREATE DATABASE IF NOT EXISTS quantity_measurement;

USE quantity_measurement;

DROP TABLE IF EXISTS quantity_measurements;

CREATE TABLE quantity_measurements (
    id INT AUTO_INCREMENT PRIMARY KEY,

    operation VARCHAR(50),

    this_value DOUBLE,
    this_unit VARCHAR(50),
    this_measurement_type VARCHAR(50),

    that_value DOUBLE,
    that_unit VARCHAR(50),
    that_measurement_type VARCHAR(50),

    result_value DOUBLE,
    result_unit VARCHAR(50),
    result_measurement_type VARCHAR(50),
    result_text VARCHAR(100),

    is_error BOOLEAN DEFAULT FALSE,
    error_message VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);