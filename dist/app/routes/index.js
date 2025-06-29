"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../../modules/User/user.route");
const auth_route_1 = require("../../modules/Auth/auth.route");
const service_routes_1 = require("../../modules/Doctor/service.routes");
const availability_routes_1 = require("../../modules/Availabilty/availability.routes");
const appointment_routes_1 = require("../../modules/Appointment/appointment.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.UserRoutes
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes
    },
    {
        path: '/doctor/services',
        route: service_routes_1.ServiceRoutes
    },
    {
        path: '/doctor/availability',
        route: availability_routes_1.AvailabilityRoutes
    },
    {
        path: '/appointments',
        route: appointment_routes_1.AppointmentRoutes
    }
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
