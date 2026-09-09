import { AuthService } from "../services/auth.service.js";

// ─────────────────────────────
// REGISTER USER
// ─────────────────────────────
export const register = async (req, res) => {
  const user = await AuthService.registerUser(req.body);

  res.status(201).json(user);
};

// ─────────────────────────────
// LOGIN USER
// ─────────────────────────────
export const login = async (req, res) => {
  const { token } = await AuthService.loginUser(req.body);

  res.status(200).json({ token });
};

// ─────────────────────────────
// GET PROFILE
// ─────────────────────────────
export const getProfile = async (req, res) => {
  const user = await AuthService.getProfile(req.user.id);

  res.status(200).json(user);
};

// ─────────────────────────────
// GET ALL USERS - ADMIN
// ─────────────────────────────
export const getAllUsers = async (req, res) => {
  const users = await AuthService.getAllUsers();

  res.status(200).json(users);
};

// ─────────────────────────────
// DELETE USER - ADMIN
// ─────────────────────────────
export const deleteUser = async (req, res) => {
  await AuthService.deleteUser(
    req.params.id,
    req.user
  );

  res.status(200).json({
    message: "Utilisateur supprimé avec succès",
  });
};