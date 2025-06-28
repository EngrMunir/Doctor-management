import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

// For logged-in user
router.get('/my-profile', UserController.getMyProfile);

// Admin only
router.get('/', UserController.getAllUsers);

// Patient-side doctor browsing
router.get('/doctors', UserController.getAllDoctors);
router.get('/doctors/:id', UserController.getSingleDoctor);

export const UserRoutes = router;
