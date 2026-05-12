const db = require('../config/db');

async function createUser(name, email, hashedPassword) {
    const sql = `
        INSERT INTO users (name, email, password)
        VALUES (?, ?, ?)
    `;

    const [result] = await db.execute(sql, [
        name,
        email,
        hashedPassword
    ]);

    return result;
}

async function findUserByEmail(email) {
    const sql = `
        SELECT * FROM users
        WHERE email = ?
    `;

    const [rows] = await db.execute(sql, [email]);

    return rows[0];
}

async function findUserById(id) {
    const sql = `
        SELECT id, name, email, role, created_at
        FROM users
        WHERE id = ?
    `;

    const [rows] = await db.execute(sql, [id]);

    return rows[0];
}

module.exports = {
    createUser,
    findUserByEmail,
    findUserById
};