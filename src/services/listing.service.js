import { Listing } from "../models/listing.model.js";
import AppError from "../errors/AppError.js";

export const ListingService = {
  // ─────────────────────────────
  // GET ALL LISTINGS
  // ─────────────────────────────
  async getAll() {
    return await Listing.findAll();
  },

  // ─────────────────────────────
  // GET LISTING BY ID
  // ─────────────────────────────
  async getById(id) {
    const listing = await Listing.findById(id);

    if (!listing) {
      throw new AppError(
        "Annonce introuvable",
        404
      );
    }

    return listing;
  },

 // ─────────────────────────────
  // GET MY LISTINGS
  // ─────────────────────────────
  async getByUserId(userId) {
    return await Listing.findByUserId(userId);
  },


  // ─────────────────────────────
  // CREATE LISTING
  // ─────────────────────────────
  async createListing(data) {
    return await Listing.create(data);
  },

  // ─────────────────────────────
  // UPDATE LISTING
  // ─────────────────────────────
  async updateListing(
    id,
    listingData,
    currentUser
  ) {
    const listing = await Listing.findById(id);

    if (!listing) {
      throw new AppError(
        "Annonce introuvable",
        404
      );
    }

    const isOwner =
      listing.user_id === currentUser.id;

    const isAdmin =
      currentUser.role === "admin";

    if (!isOwner && !isAdmin) {
      throw new AppError(
        "Accès refusé",
        403
      );
    }

    return await Listing.update(
      id,
      listingData
    );
  },

  // ─────────────────────────────
  // DELETE LISTING
  // ─────────────────────────────
  async deleteListing(
    id,
    currentUser
  ) {
    const listing = await Listing.findById(id);

    if (!listing) {
      throw new AppError(
        "Annonce introuvable",
        404
      );
    }

    const isOwner =
      listing.user_id === currentUser.id;

    const isAdmin =
      currentUser.role === "admin";

    if (!isOwner && !isAdmin) {
      throw new AppError(
        "Accès refusé",
        403
      );
    }

    return await Listing.delete(id);
  },
};