import db from "../config/db.js";

export const Reservation = {
  async findAll() {
    const [rows] = await db.query(
      "SELECT * FROM reservations"
    );

    return rows;
  },

  async findById(id) {
    const [rows] = await db.query(
      "SELECT * FROM reservations WHERE id = ?",
      [id]
    );

    return rows[0] || null;
  },

  async create(data) {
    const [result] = await db.query(
      `
      INSERT INTO reservations (
        user_id,
        room_id,
        start_at,
        end_at
      )
      VALUES (?, ?, ?, ?)
      `,
      [
        data.user_id,
        data.room_id,
        data.start_at,
        data.end_at,
      ]
    );

    return this.findById(result.insertId);
  },
};