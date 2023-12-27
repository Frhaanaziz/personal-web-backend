"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuardModule = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("./auth.guard");
const jwt_strategy_1 = require("../jwt.strategy");
const jwt_1 = require("@nestjs/jwt");
const nestjs_resend_1 = require("nestjs-resend");
const users_service_1 = require("../../users/users.service");
const prisma_module_1 = require("../../prisma/prisma.module");
let AuthGuardModule = class AuthGuardModule {
};
exports.AuthGuardModule = AuthGuardModule;
exports.AuthGuardModule = AuthGuardModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
            }),
            nestjs_resend_1.ResendModule.forRoot({
                apiKey: process.env.RESEND_API_KEY,
            }),
            prisma_module_1.PrismaModule,
        ],
        providers: [auth_guard_1.AuthGuard, jwt_strategy_1.JwtStrategy, users_service_1.UsersService, jwt_1.JwtService],
        exports: [users_service_1.UsersService],
    })
], AuthGuardModule);
//# sourceMappingURL=auth-guard.module.js.map