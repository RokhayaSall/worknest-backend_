import { Reservation } from "../models/reservation.model.js";

export const ReservationService = {
  async getAll() {
    return await Reservation.findAll();
  },

  async getById(id) {
    return await Reservation.findById(id);
  },

  async createReservation(data) {
    return await Reservation.create(data);
  },
};