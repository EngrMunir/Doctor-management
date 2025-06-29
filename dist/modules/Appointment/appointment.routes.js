"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const appointment_controller_1 = require("./appointment.controller");
const appointment_validation_1 = require("./appointment.validation");
const validateRequest_1 = __importDefault(require("../../app/middleware/validateRequest"));
const auth_1 = __importDefault(require("../../app/middleware/auth"));
const user_constant_1 = require("../User/user.constant");
const router = express_1.default.Router();
// Patient routes
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.patient), (0, validateRequest_1.default)(appointment_validation_1.bookAppointmentValidationSchema), appointment_controller_1.AppointmentController.bookAppointment);
router.get('/patient', (0, auth_1.default)(user_constant_1.USER_ROLE.patient), appointment_controller_1.AppointmentController.getMyAppointments);
// Doctor routes
router.get('/doctor', (0, auth_1.default)(user_constant_1.USER_ROLE.doctor), appointment_controller_1.AppointmentController.getDoctorAppointments);
router.patch('/doctor/:id/status', (0, auth_1.default)(user_constant_1.USER_ROLE.doctor, user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(appointment_validation_1.updateAppointmentStatusSchema), appointment_controller_1.AppointmentController.updateAppointmentStatus);
exports.AppointmentRoutes = router;
