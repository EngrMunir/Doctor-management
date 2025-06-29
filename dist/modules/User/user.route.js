"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../app/middleware/auth"));
const user_constant_1 = require("./user.constant");
const router = express_1.default.Router();
// For logged-in user
router.get('/my-profile', (0, auth_1.default)(), user_controller_1.UserController.getMyProfile);
// Admin only
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), user_controller_1.UserController.getAllUsers);
// Patient-side doctor browsing
router.get('/doctors', user_controller_1.UserController.getAllDoctors);
router.get('/doctors/:id', user_controller_1.UserController.getSingleDoctor);
exports.UserRoutes = router;
