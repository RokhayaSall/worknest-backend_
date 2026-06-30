import db from "../config/db.js";

export const Listing = {
  async findAll() {
    const [rows] = await db.query(
      "SELECT * FROM listings"
    );

    return rows;
  },

  async findById(id) {
    const [rows] = await db.query(
      "SELECT * FROM listings WHERE id = ?",
      [id]
    );

    return rows[0] || null;
  },

  async create(listingData) {
    const [result] = await db.query(
      `
      INSERT INTO listings (
        user_id,
        title,
        description,
        service,
        equipment,
        capacity,
        number_address,
        street,
        city,
        postal_code,
        country
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        listingData.user_id,
        listingData.title,
        listingData.description,
        listingData.service,
        listingData.equipment,
        listingData.capacity,
        listingData.number_address,
        listingData.street,
        listingData.city,
        listingData.postal_code,
        listingData.country,
      ]
    );

    return this.findById(result.insertId);
  },

  async update(id, listingData) {
    await db.query(
      `
      UPDATE listings
      SET
        title = ?,
        description = ?,
        service = ?,
        equipment = ?,
        capacity = ?,
        number_address = ?,
        street = ?,
        city = ?,
        postal_code = ?,
        country = ?
      WHERE id = ?
      `,
      [
        listingData.title,
        listingData.description,
        listingData.service,
        listingData.equipment,
        listingData.capacity,
        listingData.number_address,
        listingData.street,
        listingData.city,
        listingData.postal_code,
        listingData.country,
        id,
      ]
    );
  
    return this.findById(id);
  },
  
  async delete(id) {
    const listing = await this.findById(id);
  
    if (!listing) {
      return null;
    }
  
    await db.query(
      "DELETE FROM listings WHERE id = ?",
      [id]
    );
  
    return listing;
  },
};