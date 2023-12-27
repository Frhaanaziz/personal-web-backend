"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AuthGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const admin_decorator_1 = require("../admin.decorator");
const users_service_1 = require("../../users/users.service");
let AuthGuard = AuthGuard_1 = class AuthGuard {
    constructor(jwtService, usersService, reflector) {
        this.jwtService = jwtService;
        this.usersService = usersService;
        this.reflector = reflector;
        this.logger = new common_1.Logger(AuthGuard_1.name);
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
    async canActivate(context) {
        const isAdmin = this.reflector.getAllAndOverride(admin_decorator_1.IS_ADMIN_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token)
            throw new common_1.UnauthorizedException();
        try {
            const { user, } = await this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET,
            });
            request['user'] = user;
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid token, please request a new one.');
        }
        if (isAdmin) {
            this.logger.warn('Only admins can access.');
            if (request.user.role !== 'admin') {
                this.logger.fatal('Non-admin access denied.');
                throw new common_1.UnauthorizedException('Only admins can access.');
            }
            this.logger.verbose('Admin access granted.');
        }
        return true;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = AuthGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        users_service_1.UsersService,
        core_1.Reflector])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map