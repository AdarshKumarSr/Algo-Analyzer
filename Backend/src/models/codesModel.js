const pool = require('../config/db');

const getCodeBySlugAndLang = async (slug, lang) => {
    const result = await pool.query(
        `SELECT ac.code, ac.highlight_map 
         FROM algorithm_codes as ac
         JOIN algorithms a ON a.id = ac.algorithm_id          
         WHERE a.slug = $1 AND ac.language = $2` ,
        [slug, lang]);
    return result.rows[0];
};

module.exports = { getCodeBySlugAndLang };