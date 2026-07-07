import express from "express";

import {
  getProfile,
  updateProfile,
  changePassword,
  deleteProfile,
} from "../controllers/user.controller.js";

import {
  protect,
} from "../middleware/auth.middleware.js";

import upload from "../middleware/upload.middleware.js";

const router = express.Router();




router.get(
  "/profile",
  protect,
  getProfile
);


router.put(
  "/profile",
  protect,
  upload.single("avatar"),
  updateProfile
);


router.put(
  "/change-password",
  protect,
  changePassword
);


router.delete(
  "/profile",
  protect,
  deleteProfile
);

export default router;