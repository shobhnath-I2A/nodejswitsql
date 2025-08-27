// db/dbUtils.js
const db = require('../config/index');

const dbUtils = {
  /** Get all rows from table with optional pagination */
  getAll: async (table, limit = null, offset = null, orderBy = 'DESC') => {
    let query = `SELECT * FROM ??`;
    const params = [table];

    if (orderBy) {
      query += ` ORDER BY id ${orderBy}`;
    }

    if (limit !== null && offset !== null) {
      query += ` LIMIT ? OFFSET ?`;
      params.push(parseInt(limit), parseInt(offset));
    }

    const [results] = await db.query(query, params);
    return results;
  },

  /** Get a single row by ID */
  getById: async (table, id) => {
    const [results] = await db.query('SELECT * FROM ?? WHERE id = ?', [table, id]);
    return results[0];
  },

  /** Insert new row */
  create: async (table, data) => {
    const [result] = await db.query('INSERT INTO ?? SET ?', [table, data]);
    return result.insertId;
  },

  /** Update row by ID */
  update: async (table, id, data) => {
    const [result] = await db.query('UPDATE ?? SET ? WHERE id = ?', [table, data, id]);
    return result.affectedRows;
  },

  /** Delete row by ID */
  remove: async (table, id) => {
    const [result] = await db.query('DELETE FROM ?? WHERE id = ?', [table, id]);
    return result.affectedRows;
  },

  /** Bulk delete rows by array of IDs */
  deleteBulk: async (table, ids) => {
    const [result] = await db.query('DELETE FROM ?? WHERE id IN (?)', [table, ids]);
    return result.affectedRows;
  },

  /** Count all rows in table */
  count: async (table) => {
    const [results] = await db.query('SELECT COUNT(*) AS count FROM ??', [table]);
    return results[0].count;
  },

  /** Get user row by email */
  getByEmail: async (table, email) => {
    const [results] = await db.query('SELECT * FROM ?? WHERE email = ?', [table, email]);
    return results[0];
  },
  /** Get user row by Phone */
  getByPhone: async (table, mobile) => {
    const [results] = await db.query('SELECT * FROM ?? WHERE mobile = ?', [table, mobile]);
    return results[0];
  }
};

module.exports = dbUtils;
