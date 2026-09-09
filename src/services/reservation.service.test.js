import { describe, it, expect, vi, beforeEach } from "vitest";

import { ReservationService } from "./reservation.service.js";
import { Reservation } from "../models/reservation.model.js";

vi.mock("../models/reservation.model.js", () => ({
  Reservation: {
    findConflict: vi.fn(),
    create: vi.fn(),
  },
}));

describe("ReservationService - createReservation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("doit refuser une réservation si la date de fin est antérieure à la date de début", async () => {
    const data = {
      user_id: 1,
      room_id: 2,
      start_at: "2026-09-10",
      end_at: "2026-09-09",
    };

    await expect(
      ReservationService.createReservation(data)
    ).rejects.toMatchObject({
      message:
        "La date de fin doit être postérieure à la date de début.",
      status: 400,
    });
  });

  it("doit refuser une réservation si la chambre est déjà réservée", async () => {
    Reservation.findConflict.mockResolvedValue({
      id: 10,
    });

    const data = {
      user_id: 1,
      room_id: 2,
      start_at: "2026-09-10",
      end_at: "2026-09-15",
    };

    await expect(
      ReservationService.createReservation(data)
    ).rejects.toMatchObject({
      message:
        "Cette chambre est déjà réservée pour cette période.",
      status: 409,
    });
  });

  it("doit créer une réservation lorsque les données sont valides", async () => {
    Reservation.findConflict.mockResolvedValue(null);

    const data = {
      user_id: 1,
      room_id: 2,
      start_at: "2026-09-10",
      end_at: "2026-09-15",
    };

    const createdReservation = {
      id: 1,
      ...data,
    };

    Reservation.create.mockResolvedValue(
      createdReservation
    );

    const result =
      await ReservationService.createReservation(data);

    expect(Reservation.findConflict).toHaveBeenCalledWith(
      2,
      "2026-09-10",
      "2026-09-15"
    );

    expect(Reservation.create).toHaveBeenCalledWith(data);

    expect(result).toEqual(createdReservation);
  });
});