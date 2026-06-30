import { Room } from "../models/room.model.js";
import AppError from "../errors/AppError.js";

export const RoomService = {
  async getAll() {
    return await Room.findAll();
  },

  async getById(id) {
    const room = await Room.findById(id);

    if (!room) {
      throw new AppError(
        "Chambre introuvable",
        404
      );
    }

    return room;
  },

  async createRoom(data) {
    return await Room.create(data);
  },

  async updateRoom(
    id,
    roomData
  ) {
    const room = await Room.findById(id);

    if (!room) {
      throw new AppError(
        "Chambre introuvable",
        404
      );
    }

    return await Room.update(
      id,
      roomData
    );
  },

  async deleteRoom(id) {
    const room = await Room.findById(id);

    if (!room) {
      throw new AppError(
        "Chambre introuvable",
        404
      );
    }

    return await Room.delete(id);
  },
};