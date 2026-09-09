import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/user.model.js";
import AppError from "../errors/AppError.js";

export const AuthService = {
  // ─────────────────────────────
  // REGISTER USER
  // ─────────────────────────────
  async registerUser(userData) {
    const existingUser = await User.findByEmail(
      userData.email
    );

    if (existingUser) {
      throw new AppError(
        "Cet email est déjà utilisé",
        409
      );
    }

    const hashedPassword = await bcrypt.hash(
      userData.password,
      10
    );

    const user = await User.create({
      ...userData,
      password: hashedPassword,
      role: "client",
    });

    return user;
  },

  // ─────────────────────────────
  // LOGIN USER
  // ─────────────────────────────
  async loginUser({ email, password }) {
    const user = await User.findByEmail(email);

    if (!user) {
      throw new AppError(
        "Identifiants invalides",
        401
      );
    }

    const isValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isValid) {
      throw new AppError(
        "Identifiants invalides",
        401
      );
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return { token };
  },

  // ─────────────────────────────
  // GET PROFILE
  // ─────────────────────────────
  async getProfile(id) {
    const user = await User.findById(id);

    if (!user) {
      throw new AppError(
        "Utilisateur introuvable",
        404
      );
    }

    return user;
  },

  // ─────────────────────────────
// GET ALL USERS - ADMIN
// ─────────────────────────────
async getAllUsers() {
  return await User.findAll();
},

// ─────────────────────────────
// DELETE USER - ADMIN
// ─────────────────────────────
async deleteUser(id, currentUser) {
  if (Number(id) === Number(currentUser.id)) {
    throw new AppError(
      "Vous ne pouvez pas supprimer votre propre compte",
      403
    );
  }

  const user = await User.findById(id);

  if (!user) {
    throw new AppError(
      "Utilisateur introuvable",
      404
    );
  }

  await User.delete(id);

  return user;
},

};