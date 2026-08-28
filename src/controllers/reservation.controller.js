import { ReservationService } from "../services/reservation.service.js";

export const getReservations = async (req, res) => {
  const reservations =
    await ReservationService.getAll();

  res.status(200).json(reservations);
};

export const getReservation = async (req, res) => {
  const reservation =
    await ReservationService.getById(req.params.id);

  res.status(200).json(reservation);
};

export const getMyReservations = async (req, res) => {
  const reservations =
    await ReservationService.getByUserId(req.user.id);

  res.status(200).json(reservations);
};

export const createReservation = async (req, res) => {
  const reservation =
    await ReservationService.createReservation({
      ...req.body,
      user_id: req.user.id,
    });

  res.status(201).json(reservation);
};