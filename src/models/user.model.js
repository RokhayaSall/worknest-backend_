import db from "../config/db.js";

export const User = {
  // ─────────────────────────────
  // FIND USER BY EMAIL
  // ─────────────────────────────
  async findByEmail(email) {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    return rows[0] || null;
  },

  // ─────────────────────────────
  // FIND USER BY ID
  // ─────────────────────────────
  async findById(id) {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );

    return rows[0] || null;
  },

  // ─────────────────────────────
  // FIND ALL USERS
  // ─────────────────────────────
  async findAll() {
    const [rows] = await db.query(`
    SELECT
      id,
      last_name,
      first_name,
      birth_date,
      email,
      gender,
      role,
      number_address,
      street,
      city,
      postal_code,
      country
    FROM users
  `);

    return rows;
  },

  // ─────────────────────────────
  // DELETE USER
  // ─────────────────────────────
  async delete(id) {
    const [result] = await db.query(
      "DELETE FROM users WHERE id = ?",
      [id]
    );

    return result.affectedRows > 0;
  },

  // ─────────────────────────────
  // CREATE USER
  // ─────────────────────────────
  async create({
    last_name,
    first_name,
    birth_date,
    email,
    gender,
    role,
    password,
    number_address,
    street,
    city,
    postal_code,
    country,
  }) {
    const [result] = await db.query(
      `
      INSERT INTO users (
        last_name,
        first_name,
        birth_date,
        email,
        gender,
        role,
        password,
        number_address,
        street,
        city,
        postal_code,
        country
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        last_name,
        first_name,
        birth_date,
        email,
        gender,
        role,
        password,
        number_address,
        street,
        city,
        postal_code,
        country,
      ]
    );

    return this.findById(result.insertId);
  },

  // ─────────────────────────────
  // FIND ALL USERS
  // ─────────────────────────────
  async findAll() {
    const [rows] = await db.query(`
    SELECT
      id,
      last_name,
      first_name,
      birth_date,
      email,
      gender,
      role,
      number_address,
      street,
      city,
      postal_code,
      country
    FROM users
  `);

    return rows;
  },

  // ─────────────────────────────
  // DELETE USER
  // ─────────────────────────────
  async delete(id) {
    const [result] = await db.query(
      "DELETE FROM users WHERE id = ?",
      [id]
    );

    return result.affectedRows > 0;
  },

};

