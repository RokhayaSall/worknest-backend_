import AppError from "../errors/AppError.js";

// ─────────────────────────────
// AUTHORIZE ROLE
// ─────────────────────────────
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          "Accès refusé",
          403
        )
      );
    }

    next();
  };
};