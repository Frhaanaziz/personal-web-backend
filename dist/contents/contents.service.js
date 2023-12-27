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
exports.ContentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ContentsService = class ContentsService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async findOne(contentWhereUniqueInput) {
        return this.prismaService.content.findUnique({
            where: contentWhereUniqueInput,
        });
    }
    async findMany(params) {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prismaService.content.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }
    async create(data) {
        return this.prismaService.content.create({
            data: {
                content: data.content,
                locale: data.locale,
                keyword: {
                    connect: {
                        id: data.keywordId,
                    },
                },
            },
        });
    }
    async update(params) {
        const { where, data } = params;
        return this.prismaService.content.update({
            data,
            where,
        });
    }
    async delete(where) {
        return this.prismaService.content.delete({
            where,
        });
    }
};
exports.ContentsService = ContentsService;
exports.ContentsService = ContentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContentsService);
//# sourceMappingURL=contents.service.js.map