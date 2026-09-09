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

  async findByUserId(userId) {
    const [rows] = await db.query(
      `
    SELECT
      reservations.id,
      reservations.user_id,
      reservations.room_id,
      reservations.start_at,
      reservations.end_at,
      rooms.room_number
    FROM reservations
    INNER JOIN rooms
      ON reservations.room_id = rooms.id
    WHERE reservations.user_id = ?
    `,
      [userId]
    );

    return rows;
  },

  
  async findConflict(roomId, startAt, endAt) {
    const [rows] = await db.query(
      `
      SELECT *
      FROM reservations
      WHERE room_id = ?
        AND start_at < ?
        AND end_at > ?
      `,
      [roomId, endAt, startAt]
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