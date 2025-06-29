"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const service_controller_1 = require("./service.controller");
const service_validation_1 = require("./service.validation");
const validateRequest_1 = __importDefault(require("../../app/middleware/validateRequest"));
const auth_1 = __importDefault(require("../../app/middleware/auth"));
const user_constant_1 = require("../User/user.constant");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.doctor), service_controller_1.ServiceController.getMyServices);
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.doctor), (0, validateRequest_1.default)(service_validation_1.createServiceValidationSchema), service_controller_1.ServiceController.createService);
router.patch('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.doctor), (0, validateRequest_1.default)(service_validation_1.updateServiceValidationSchema), service_controller_1.ServiceController.updateService);
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.doctor), service_controller_1.ServiceController.deleteService);
exports.ServiceRoutes = router;
