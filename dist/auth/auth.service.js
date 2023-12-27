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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const nestjs_resend_1 = require("nestjs-resend");
const users_service_1 = require("../users/users.service");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthService = class AuthService {
    constructor(usersService, resendService, jwtService, prismaService) {
        this.usersService = usersService;
        this.resendService = resendService;
        this.jwtService = jwtService;
        this.prismaService = prismaService;
        this.logger = new common_1.Logger('AuthService');
    }
    async signIn(signInDto) {
        const { email, password } = signInDto;
        const user = await this.prismaService.user.findUnique({
            where: {
                email,
            },
        });
        if (user && !user.hashedPassword)
            throw new common_1.NotFoundException('Please create a password from forgot password');
        if (!user || !user?.hashedPassword)
            throw new common_1.UnauthorizedException('Incorrect email or password');
        if (!user.emailVerified)
            throw new common_1.UnauthorizedException('Please confirm your email to login');
        const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
        if (!passwordMatch)
            throw new common_1.UnauthorizedException('Incorrect email or password');
        const accessTokenPayload = { user: { id: user.id, role: user.role } };
        const accessToken = this.jwtService.sign(accessTokenPayload, {
            secret: process.env.JWT_SECRET,
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        return { accessToken, user };
    }
    async signUp(authCredentialsDto) {
        const { name, email, password } = authCredentialsDto;
        const exist = await this.usersService.findOne({
            email,
        });
        if (exist) {
            const passwordMatch = await bcrypt.compare(password, exist.hashedPassword);
            if (!passwordMatch)
                throw new common_1.UnauthorizedException('Incorrect email or password');
            if (exist.emailVerified)
                throw new common_1.UnauthorizedException('Email already verified, please login');
        }
        if (!exist) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await this.usersService.create({
                name,
                email,
                hashedPassword,
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
                html: `<div><h1>Confirm Email</h1><a href="${process.env.CONSOLE_URL +
                    '/api/auth/verify-email?token=' +
                    emailToken +
                    '&id=' +
                    user.id}">Click here to verify your email address</a></div>`,
            });
        }
        else if (!exist.emailVerified) {
            const emailTokenPayload = { user: { id: exist.id } };
            const emailToken = this.jwtService.sign(emailTokenPayload, {
                secret: process.env.JWT_SECRET,
                expiresIn: process.env.JWT_EXPIRES_IN,
            });
            this.resendService.send({
                from: 'Portfolio <portfolio-console@aththariq.com>',
                to: [email],
                subject: 'Email Verification',
                html: `<div><h1>Confirm Email</h1><a href="${process.env.CONSOLE_URL + '/api/auth/verify-email?token=' + emailToken}">Click here to verify your email address</a></div>`,
            });
        }
    }
    async loginGoogle(loginGoogleDto) {
        const { accounts, ...data } = loginGoogleDto;
        try {
            const user = await this.prismaService.user.findUnique({
                where: {
                    email: data.email,
                },
            });
            if (!user) {
                const user = await this.prismaService.user.create({
                    data: {
                        ...data,
                        accounts: {
                            create: accounts,
                        },
                    },
                });
                const accessTokenPayload = { user: { id: user.id, role: user.role } };
                const accessToken = this.jwtService.sign(accessTokenPayload, {
                    secret: process.env.JWT_SECRET,
                    expiresIn: process.env.JWT_EXPIRES_IN,
                });
                return { accessToken, user };
            }
            else {
                const accessTokenPayload = { user: { id: user.id, role: user.role } };
                const accessToken = this.jwtService.sign(accessTokenPayload, {
                    secret: process.env.JWT_SECRET,
                    expiresIn: process.env.JWT_EXPIRES_IN,
                });
                return { accessToken, user };
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to login');
        }
    }
    async verifyEmailToken(token) {
        try {
            return this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET,
            });
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        nestjs_resend_1.ResendService,
        jwt_1.JwtService,
        prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map