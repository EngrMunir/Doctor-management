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
exports.UserServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("./user.model");
const AppError_1 = __importDefault(require("../../app/errors/AppError"));
const service_model_1 = require("../Doctor/service.model");
const getSingleUserFromDB = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ email: userEmail }).select('-password -refreshToken');
    if (!result)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    return result;
});
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find().select('-password -refreshToken');
    return result;
});
const getAllDoctors = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find({ role: 'doctor' }).select('-password -refreshToken');
    return result;
});
const getFilteredDoctors = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { role: 'doctor' };
    if (filters.specialization) {
        query.specialization = { $regex: filters.specialization, $options: 'i' };
    }
    if (filters.hospitalName) {
        query.hospitalName = { $regex: filters.hospitalName, $options: 'i' };
    }
    let doctors = yield user_model_1.User.find(query).select('-password -refreshToken');
    if (filters.serviceName) {
        const matchingServices = yield service_model_1.Service.find({
            title: { $regex: filters.serviceName, $options: 'i' },
        });
        const matchingDoctorIds = matchingServices.map(s => { var _a; return (_a = s.doctorId) === null || _a === void 0 ? void 0 : _a.toString(); });
        doctors = doctors.filter(doc => { var _a; return matchingDoctorIds.includes((_a = doc._id) === null || _a === void 0 ? void 0 : _a.toString()); });
    }
    return doctors;
});
const getDoctorById = (doctorId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({
        _id: doctorId,
        role: 'doctor',
    }).select('-password -refreshToken');
    return result;
});
exports.UserServices = {
    getSingleUserFromDB,
    getAllUsersFromDB,
    getAllDoctors,
    getFilteredDoctors,
    getDoctorById
};
