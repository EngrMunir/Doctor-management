"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const validateRequest_1 = __importDefault(require("../../app/middleware/validateRequest"));
const router = express_1.default.Router();
// Doctor registration
router.post('/register-doctor', auth_controller_1.AuthControllers.registerDoctor);
// Patient registration
router.post('/register-patient', auth_controller_1.AuthControllers.registerPatient);
// Login
router.post('/login', (0, validateRequest_1.default)(auth_validation_1.AuthValidations.loginValidationSchema), auth_controller_1.AuthControllers.loginUser);
// Refresh token
router.post('/refresh-token', (0, validateRequest_1.default)(auth_validation_1.AuthValidations.refreshTokenValidationSchema), auth_controller_1.AuthControllers.refreshToken);
// Logout
router.post('/logout', auth_controller_1.AuthControllers.logoutUser);
exports.AuthRoutes = router;
