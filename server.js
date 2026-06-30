import "dotenv/config";
import express from "express";
import cors from "cors";

import authRoutes from "./src/routes/auth.routes.js";

import errorHandler from "./src/middlewares/errorHandler.js";

import listingRoutes from "./src/routes/listings.routes.js";

import roomRoutes from "./src/routes/rooms.routes.js";

import reservationRoutes
from "./src/routes/reservations.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// ─────────────────────────────
// GLOBAL MIDDLEWARES
// ─────────────────────────────
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

// ─────────────────────────────
// TEST ROUTE
// ─────────────────────────────
app.get("/", (req, res) => {
  res.send("WorkNest API OK");
});

// ─────────────────────────────
// API ROUTES
// ─────────────────────────────
app.use("/api/auth", authRoutes);

// FUTURES ROUTES
app.use("/api/listings", listingRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/reservations", reservationRoutes);

// ─────────────────────────────
// ERROR HANDLER
// ─────────────────────────────
app.use(errorHandler);

// ─────────────────────────────
// SERVER
// ─────────────────────────────
app.listen(PORT, () => {
  console.log(
    `Serveur démarré sur http://localhost:${PORT}`
  );
});