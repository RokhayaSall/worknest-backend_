import db from "../config/db.js";

export const Room = {
  async findAll() {
    const [rows] = await db.query(
      "SELECT * FROM rooms"
    );

    return rows;
  },

  async findById(id) {
    const [rows] = await db.query(
      "SELECT * FROM rooms WHERE id = ?",
      [id]
    );

    return rows[0] || null;
  },

  async create(roomData) {
    const [result] = await db.query(
      `
      INSERT INTO rooms (
        listing_id,
        room_number,
        description,
        price,
        start_at,
        end_at
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        roomData.listing_id,
        roomData.room_number,
        roomData.description,
        roomData.price,
        roomData.start_at,
        roomData.end_at,
      ]
    );

    return this.findById(result.insertId);
  },

  async update(id, roomData) {
    await db.query(
      `
      UPDATE rooms
      SET
        room_number = ?,
        description = ?,
        price = ?,
        start_at = ?,
        end_at = ?
      WHERE id = ?
      `,
      [
        roomData.room_number,
        roomData.description,
        roomData.price,
        roomData.start_at,
        roomData.end_at,
        id,
      ]
    );

    return this.findById(id);
  },

  async delete(id) {
    const room = await this.findById(id);

    if (!room) {
      return null;
    }

    await db.query(
      "DELETE FROM rooms WHERE id = ?",
      [id]
    );

    return room;
  },
};