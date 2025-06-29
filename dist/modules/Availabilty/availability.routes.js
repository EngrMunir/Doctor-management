"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityRoutes = void 0;
const express_1 = __importDefault(require("express"));
const availability_controller_1 = require("./availability.controller");
const availability_validation_1 = require("./availability.validation");
const validateRequest_1 = __importDefault(require("../../app/middleware/validateRequest"));
const auth_1 = __importDefault(require("../../app/middleware/auth"));
const user_constant_1 = require("../User/user.constant");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.doctor), (0, validateRequest_1.default)(availability_validation_1.createAvailabilityValidationSchema), availability_controller_1.AvailabilityController.createAvailability);
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.doctor), availability_controller_1.AvailabilityController.getMyAvailability);
router.patch('/:id', (0, validateRequest_1.default)(availability_validation_1.updateAvailabilityValidationSchema), availability_controller_1.AvailabilityController.updateAvailability);
router.delete('/:id', availability_controller_1.AvailabilityController.deleteAvailability);
exports.AvailabilityRoutes = router;
