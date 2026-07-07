import express from "express";

import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getMyProperties,
} from "../controllers/property.controller.js";

import {
  protect,
  authorize,
} from "../middleware/auth.middleware.js";

import upload from "../middleware/upload.middleware.js";

const router = express.Router();




router.get("/", getAllProperties);
router.get(
  "/my-properties",
  protect,
  authorize("owner", "admin"),
  getMyProperties
);

router.get("/:id", getPropertyById);




router.post(
  "/",
  protect,
  authorize("owner", "admin"),
  upload.array("images", 6),
  createProperty
);





router.put(
  "/:id",
  protect,
  authorize("owner", "admin"),
  upload.array("images", 6),
  updateProperty
);


router.delete(
  "/:id",
  protect,
  authorize("owner", "admin"),
  deleteProperty
);

export default router;