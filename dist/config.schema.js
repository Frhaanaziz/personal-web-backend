"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configValidationSchema = void 0;
const Joi = require("@hapi/joi");
exports.configValidationSchema = Joi.object({
    DATABASE_URL: Joi.string().required(),
    PORT: Joi.number().required(),
    CONSOLE_URL: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRES_IN: Joi.string().required(),
    EMAIL_SECRET: Joi.string().required(),
    RESEND_API_KEY: Joi.string().required(),
});
//# sourceMappingURL=config.schema.js.map