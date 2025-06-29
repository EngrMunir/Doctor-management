import express from "express";
import { UserController } from "./user.controller";
import auth from "../../app/middleware/auth";
import { USER_ROLE } from "./user.constant";

const router = express.Router();

// For logged-in user
router.get('/my-profile', auth(), UserController.getMyProfile);

// Admin only
router.get('/', auth(USER_ROLE.admin), UserController.getAllUsers);

// Patient-side doctor browsing
router.get('/doctors', UserController.getAllDoctors);
router.get('/doctors/:id', UserController.getSingleDoctor);

export const UserRoutes = router;
