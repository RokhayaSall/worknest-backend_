import { ListingService } from "../services/listing.service.js";

export const getListings = async (
  req,
  res
) => {
  const listings =
    await ListingService.getAll();

  res.status(200).json(listings);
};

export const getListing = async (
  req,
  res
) => {
  const listing =
    await ListingService.getById(
      req.params.id
    );

  res.status(200).json(listing);
};

export const createListing = async (
  req,
  res
) => {
  const listing =
    await ListingService.createListing({
      ...req.body,
      user_id: req.user.id,
    });

  res.status(201).json(listing);
};

// ─────────────────────────────
// UPDATE LISTING
// ─────────────────────────────
export const updateListing = async (
  req,
  res
) => {
  const listing =
    await ListingService.updateListing(
      req.params.id,
      req.body,
      req.user
    );

  res.status(200).json(listing);
};

// ─────────────────────────────
// DELETE LISTING
// ─────────────────────────────
export const deleteListing = async (
  req,
  res
) => {
  await ListingService.deleteListing(
    req.params.id,
    req.user
  );

  res.status(200).json({
    message:
      "Annonce supprimée avec succès",
  });
};