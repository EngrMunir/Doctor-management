"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_service_1 = require("./user.service");
const catchAsync_1 = require("../../app/utils/catchAsync");
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const service_model_1 = require("../Doctor/service.model");
const availability_model_1 = require("../Availabilty/availability.model");
const getAllUsers = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserServices.getAllUsersFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Users retrieved successfully',
        data: result,
    });
}));
const getMyProfile = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(req.headers.authorization);
    const email = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
    console.log(email);
    if (!email)
        throw new Error("User email is required");
    const result = yield user_service_1.UserServices.getSingleUserFromDB(email);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User profile fetched successfully',
        data: result,
    });
}));
const getAllDoctors = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = {
        specialization: req.query.specialization,
        hospitalName: req.query.hospitalName,
    };
    const result = yield user_service_1.UserServices.getFilteredDoctors(filters);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Doctors retrieved successfully',
        data: result,
    });
}));
const getSingleDoctor = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorId = req.params.id;
    const doctor = yield user_service_1.UserServices.getDoctorById(doctorId);
    if (!doctor)
        throw new Error("Doctor not found");
    const services = yield service_model_1.Service.find({ doctorId });
    const availability = yield availability_model_1.Availability.find({ doctorId });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Doctor profile fetched successfully',
        data: {
            doctor,
            services,
            availability,
        },
    });
}));
exports.UserController = {
    getAllUsers,
    getMyProfile,
    getAllDoctors,
    getSingleDoctor
};
