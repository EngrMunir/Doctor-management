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
exports.AvailabilityController = void 0;
const availability_model_1 = require("./availability.model");
const catchAsync_1 = require("../../app/utils/catchAsync");
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const createAvailability = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const doctorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    console.log(doctorId);
    const result = yield availability_model_1.Availability.create(Object.assign(Object.assign({}, req.body), { doctorId }));
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Availability created successfully',
        data: result,
    });
}));
const getMyAvailability = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const doctorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const result = yield availability_model_1.Availability.find({ doctorId }).populate('serviceId');
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Availability fetched successfully',
        data: result,
    });
}));
const updateAvailability = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const doctorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const { id } = req.params;
    const result = yield availability_model_1.Availability.findOneAndUpdate({ _id: id, doctorId }, req.body, { new: true });
    if (!result) {
        return res.status(404).json({ success: false, message: 'Availability not found or unauthorized' });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Availability updated successfully',
        data: result,
    });
}));
const deleteAvailability = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const doctorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const { id } = req.params;
    const result = yield availability_model_1.Availability.findOneAndDelete({ _id: id, doctorId });
    if (!result) {
        return res.status(404).json({ success: false, message: 'Availability not found or unauthorized' });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Availability deleted successfully',
        data: result,
    });
}));
exports.AvailabilityController = {
    createAvailability,
    getMyAvailability,
    updateAvailability,
    deleteAvailability,
};
