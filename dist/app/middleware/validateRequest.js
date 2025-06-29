"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const AppError_1 = __importDefault(require("../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const validateRequest = (schema) => {
    return (req, res, next) => {
        var _a;
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
                cookies: req.cookies,
            });
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const firstMessage = ((_a = error.errors[0]) === null || _a === void 0 ? void 0 : _a.message) || 'Invalid request data';
                next(new AppError_1.default(http_status_1.default.BAD_REQUEST, firstMessage));
            }
            else {
                next(error);
            }
        }
    };
};
exports.default = validateRequest;
