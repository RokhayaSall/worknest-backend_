import { Room } from "../models/room.model.js";
import { Listing } from "../models/listing.model.js";
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

  async createRoom(data, currentUser) {
    const listing =
      await Listing.findById(data.listing_id);

    if (!listing) {
      throw new AppError(
        "Annonce introuvable",
        404
      );
    }

    const isOwner =
      Number(listing.user_id) ===
      Number(currentUser.id);

    const isAdmin =
      currentUser.role === "admin";

    if (!isOwner && !isAdmin) {
      throw new AppError(
        "Vous ne pouvez pas ajouter une chambre à cette annonce",
        403
      );
    }

    return await Room.create(data);
  },

  async updateRoom(
    id,
    roomData,
    currentUser
  ) {
    const room = await Room.findById(id);

    if (!room) {
      throw new AppError(
        "Chambre introuvable",
        404
      );
    }

    const listing =
      await Listing.findById(room.listing_id);

    if (!listing) {
      throw new AppError(
        "Annonce introuvable",
        404
      );
    }

    const isOwner =
      Number(listing.user_id) ===
      Number(currentUser.id);

    const isAdmin =
      currentUser.role === "admin";

    if (!isOwner && !isAdmin) {
      throw new AppError(
        "Accès refusé",
        403
      );
    }

    // Si on change l'annonce associée à la chambre,
    // on vérifie également que la nouvelle annonce
    // appartient au propriétaire connecté.
    if (
      roomData.listing_id &&
      Number(roomData.listing_id) !==
        Number(room.listing_id)
    ) {
      const newListing =
        await Listing.findById(
          roomData.listing_id
        );

      if (!newListing) {
        throw new AppError(
          "Annonce introuvable",
          404
        );
      }

      const ownsNewListing =
        Number(newListing.user_id) ===
        Number(currentUser.id);

      if (
        !ownsNewListing &&
        !isAdmin
      ) {
        throw new AppError(
          "Accès refusé",
          403
        );
      }
    }

    return await Room.update(
      id,
      roomData
    );
  },

  async deleteRoom(
    id,
    currentUser
  ) {
    const room = await Room.findById(id);

    if (!room) {
      throw new AppError(
        "Chambre introuvable",
        404
      );
    }

    const listing =
      await Listing.findById(
        room.listing_id
      );

    if (!listing) {
      throw new AppError(
        "Annonce introuvable",
        404
      );
    }

    const isOwner =
      Number(listing.user_id) ===
      Number(currentUser.id);

    const isAdmin =
      currentUser.role === "admin";

    if (!isOwner && !isAdmin) {
      throw new AppError(
        "Accès refusé",
        403
      );
    }

    return await Room.delete(id);
  },
};