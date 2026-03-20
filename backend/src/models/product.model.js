import { pool } from '../config/database.js';

export const getAll = async () => {
    const res = await pool.query('SELECT * FROM products');
    return res.rows;
}

export const getById = async (id) => {
    const res = await pool.query(
        'SELECT * FROM products WHERE id = $1', [id]);
    return res.rows[0];
}

export const create = async ({ name, category, brand, stock, price, available }) => {
    const res = await pool.query(
        'INSERT INTO products (name, category, brand, stock, price, available) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [name, category, brand, stock, price, available]);
    return res.rows[0];
}

export const update = async (id, { name, category, brand, stock, price, available }) => {
    const res = await pool.query(
        'UPDATE products SET name = $1, category = $2, brand = $3, stock = $4, price = $5, available = $6 WHERE id = $7 RETURNING *', [name, category, brand, stock, price, available, id]);
    return res.rows[0];
}

export const remove = async (id) => {
    const res = await pool.query(
        'DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    return res.rows[0];
}

export const patch = async (id, fields) => {
  const keys = Object.keys(fields);

  if (keys.length === 0) {
    throw new Error('No hay campos para actualizar');
  }

  const values = Object.values(fields);

  const setQuery = keys
    .map((key, i) => `${key} = $${i + 1}`)
    .join(', ');

  const query = `
    UPDATE products
    SET ${setQuery}
    WHERE id = $${keys.length + 1}
    RETURNING *
  `;

  const result = await pool.query(query, [...values, id]);
  return result.rows[0];
};

