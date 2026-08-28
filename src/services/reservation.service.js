import { Reservation } from "../models/reservation.model.js";

export const ReservationService = {
  async getAll() {
    return await Reservation.findAll();
  },

  async getById(id) {
    return await Reservation.findById(id);
  },

  async getByUserId(userId) {
  return await Reservation.findByUserId(userId);
},

  async createReservation(data) {
    if (new Date(data.start_at) >= new Date(data.end_at)) {
      const error = new Error(
        "La date de fin doit être postérieure à la date de début."
      );

      error.status = 400;
      throw error;
    }

    const conflict = await Reservation.findConflict(
      data.room_id,
      data.start_at,
      data.end_at
    );

    if (conflict) {
      const error = new Error(
        "Cette chambre est déjà réservée pour cette période."
      );

      error.status = 409;
      throw error;
    }

    return await Reservation.create(data);
  },
};