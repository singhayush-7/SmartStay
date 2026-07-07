import express from "express";

import {
  createRoom,
  getRoomsByProperty,
  getRoomById,
  updateRoom,
  deleteRoom,
} from "../controllers/room.controller.js";

import {
  protect,
  authorize,
} from "../middleware/auth.middleware.js";

import upload from "../middleware/upload.middleware.js";

const router = express.Router();




router.get("/property/:propertyId", getRoomsByProperty);


router.get("/:id", getRoomById);




router.post(
  "/",
  protect,
  authorize("owner", "admin"),
  upload.array("images", 6),
  createRoom
);


router.put(
  "/:id",
  protect,
  authorize("owner", "admin"),
  upload.array("images", 6),
  updateRoom
);


router.delete(
  "/:id",
  protect,
  authorize("owner", "admin"),
  deleteRoom
);

export default router;