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
exports.AppointmentController = void 0;
const appointment_model_1 = require("./appointment.model");
const catchAsync_1 = require("../../app/utils/catchAsync");
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
// Book appointment (patient)
const bookAppointment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const patientId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const exists = yield appointment_model_1.Appointment.findOne({
        doctorId: req.body.doctorId,
        selectedDate: req.body.selectedDate,
        timeSlot: req.body.timeSlot,
        status: { $in: ['pending', 'accepted'] },
    });
    if (exists) {
        return res.status(400).json({ success: false, message: 'Time slot already booked' });
    }
    const result = yield appointment_model_1.Appointment.create(Object.assign(Object.assign({}, req.body), { patientId }));
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Appointment booked successfully',
        data: result,
    });
}));
// View my appointments (patient)
const getMyAppointments = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const patientId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const result = yield appointment_model_1.Appointment.find({ patientId })
        .populate('doctorId')
        .populate('serviceId');
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Appointments fetched',
        data: result,
    });
}));
// View doctor's appointments
const getDoctorAppointments = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const doctorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const statusFilter = req.query.status;
    const filter = { doctorId };
    if (statusFilter)
        filter.status = statusFilter;
    const result = yield appointment_model_1.Appointment.find(filter).populate('patientId').populate('serviceId');
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Doctor appointments fetched',
        data: result,
    });
}));
// Update appointment status (doctor)
const updateAppointmentStatus = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const doctorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const result = yield appointment_model_1.Appointment.findOneAndUpdate({ _id: id, doctorId }, { status: req.body.status }, { new: true });
    if (!result) {
        return res.status(404).json({ success: false, message: 'Appointment not found or unauthorized' });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Appointment status updated',
        data: result,
    });
}));
exports.AppointmentController = {
    bookAppointment,
    getMyAppointments,
    getDoctorAppointments,
    updateAppointmentStatus,
};
