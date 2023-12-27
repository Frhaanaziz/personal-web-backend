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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_resend_1 = require("nestjs-resend");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../prisma/prisma.service");
let UsersService = class UsersService {
    constructor(db, resendService, jwtService) {
        this.db = db;
        this.resendService = resendService;
        this.jwtService = jwtService;
    }
    async findOne(userWhereUniqueInput) {
        return this.db.user.findUnique({
            where: userWhereUniqueInput,
        });
    }
    async findMany(params) {
        const { skip, take, cursor, where, orderBy } = params;
        return this.db.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }
    async create(data) {
        return this.db.user.create({
            data,
        });
    }
    async update(params) {
        const { where, data } = params;
        return this.db.user.update({
            data,
            where,
        });
    }
    async delete(where) {
        return this.db.user.delete({
            where,
        });
    }
    async resetPassword({ newPassword, userId }) {
        try {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const updatedUser = await this.db.user.update({
                where: {
                    id: userId,
                },
                data: {
                    hashedPassword,
                    emailVerified: true,
                },
            });
            return updatedUser;
        }
        catch (error) {
            throw new common_1.NotFoundException('Account not found');
        }
    }
    async validateEmail(email) {
        try {
            const user = await this.db.user.findUnique({
                where: {
                    email,
                },
            });
            const emailTokenPayload = { user: { id: user.id } };
            const emailToken = this.jwtService.sign(emailTokenPayload, {
                secret: process.env.JWT_SECRET,
                expiresIn: process.env.JWT_EXPIRES_IN,
            });
            this.resendService.send({
                from: 'Portfolio <portfolio-console@aththariq.com>',
                to: [email],
                subject: 'Email Verification',
                html: `
              <div>
                  <h1>Confirm Email</h1>
                   <a 
                   href="${process.env.CONSOLE_URL}/auth/reset-password/${emailToken}"
                     >Click here to reset your password</a>
              </div>
               `,
            });
            return user;
        }
        catch (error) {
            throw new common_1.NotFoundException('Account not found');
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        nestjs_resend_1.ResendService,
        jwt_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map