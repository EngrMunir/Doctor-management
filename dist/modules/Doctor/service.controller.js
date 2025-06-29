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
exports.ServiceController = void 0;
const catchAsync_1 = require("../../app/utils/catchAsync");
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const service_model_1 = require("./service.model");
// Create service
const createService = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const doctorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const result = yield service_model_1.Service.create(Object.assign(Object.assign({}, req.body), { doctorId }));
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Service created successfully',
        data: result,
    });
}));
// Get own services
const getMyServices = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const doctorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const result = yield service_model_1.Service.find({ doctorId });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Services retrieved successfully',
        data: result,
    });
}));
// Update service
const updateService = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const doctorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const updated = yield service_model_1.Service.findOneAndUpdate({ _id: id, doctorId }, req.body, { new: true });
    if (!updated) {
        return res.status(404).json({ success: false, message: 'Service not found or unauthorized' });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Service updated successfully',
        data: updated,
    });
}));
// Delete service
const deleteService = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const doctorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const deleted = yield service_model_1.Service.findOneAndDelete({ _id: id, doctorId });
    if (!deleted) {
        return res.status(404).json({ success: false, message: 'Service not found or unauthorized' });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Service deleted successfully',
        data: deleted,
    });
}));
exports.ServiceController = {
    createService,
    getMyServices,
    updateService,
    deleteService,
};
