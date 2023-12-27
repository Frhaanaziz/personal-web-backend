"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentsModule = void 0;
const common_1 = require("@nestjs/common");
const contents_service_1 = require("./contents.service");
const contents_controller_1 = require("./contents.controller");
const auth_guard_module_1 = require("../auth/auth-guard/auth-guard.module");
const prisma_module_1 = require("../prisma/prisma.module");
let ContentsModule = class ContentsModule {
};
exports.ContentsModule = ContentsModule;
exports.ContentsModule = ContentsModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_guard_module_1.AuthGuardModule, prisma_module_1.PrismaModule],
        controllers: [contents_controller_1.ContentsController],
        providers: [
            contents_service_1.ContentsService,
        ],
    })
], ContentsModule);
//# sourceMappingURL=contents.module.js.map