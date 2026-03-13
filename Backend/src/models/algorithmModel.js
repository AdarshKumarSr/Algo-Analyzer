const pool = require('../config/db');

const getAll = async () => {
    const result = await pool.query('SELECT * FROM algorithms ORDER BY order_index');
    return result.rows;
}

const getBySlug = async (slug) => {
    const result = await pool.query('SELECT * FROM algorithms WHERE slug = $1', [slug]);
    return result.rows[0]
}

module.exports = {getAll, getBySlug};