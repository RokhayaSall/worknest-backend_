import { RoomService } from "../services/room.service.js";

export const getRooms = async (
  req,
  res
) => {
  const rooms =
    await RoomService.getAll();

  res.status(200).json(rooms);
};

export const getRoom = async (
  req,
  res
) => {
  const room =
    await RoomService.getById(
      req.params.id
    );

  res.status(200).json(room);
};

export const createRoom = async (
  req,
  res
) => {
  const room =
    await RoomService.createRoom(
      req.body
    );

  res.status(201).json(room);
};

export const updateRoom = async (
  req,
  res
) => {
  const room =
    await RoomService.updateRoom(
      req.params.id,
      req.body
    );

  res.status(200).json(room);
};

export const deleteRoom = async (
  req,
  res
) => {
  await RoomService.deleteRoom(
    req.params.id
  );

  res.status(200).json({
    message:
      "Chambre supprimée avec succès",
  });
};