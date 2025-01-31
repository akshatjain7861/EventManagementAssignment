const pool = require('../config/db');

class Category {
    static async create(name) {
        const { rows } = await pool.query(`INSERT INTO categories (name) VALUES ($1) RETURNING *`, [name]);
        return rows[0];
    }

    static async getAll() {
        const { rows } = await pool.query(`SELECT * FROM categories ORDER BY name ASC`);
        return rows;
    }
}

module.exports = Category;
