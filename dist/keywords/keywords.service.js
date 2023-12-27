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
exports.KeywordsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const utility_service_1 = require("../utility/utility.service");
let KeywordsService = class KeywordsService {
    constructor(prismaService, utilityService) {
        this.prismaService = prismaService;
        this.utilityService = utilityService;
    }
    async findOne(contentWhereUniqueInput) {
        return this.prismaService.keyword.findUnique({
            where: contentWhereUniqueInput,
        });
    }
    async findMany(params) {
        const { skip, take, cursor, where, orderBy, include } = params;
        return this.prismaService.keyword.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include,
        });
    }
    async create(data) {
        return this.prismaService.keyword.create({
            data,
        });
    }
    async update(params) {
        const { where, data } = params;
        return this.prismaService.keyword.update({
            data,
            where,
        });
    }
    async delete(where) {
        return this.prismaService.keyword.delete({
            where,
        });
    }
    findAll({ page }) {
        return this.utilityService.getPaginatedResult(page, 'Keyword');
    }
};
exports.KeywordsService = KeywordsService;
exports.KeywordsService = KeywordsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        utility_service_1.UtilityService])
], KeywordsService);
//# sourceMappingURL=keywords.service.js.map