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
exports.UtilityService = void 0;
const common_1 = require("@nestjs/common");
const utility_constant_1 = require("./utility.constant");
const prisma_service_1 = require("../prisma/prisma.service");
let UtilityService = class UtilityService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getPaginatedResult(page, model) {
        const totalRow = await this.prismaService[model].count();
        const savePage = page < 1 ? 1 : page;
        const rowsPerPage = utility_constant_1.PER_PAGE;
        const totalPages = Math.ceil(totalRow / rowsPerPage);
        let rows = [];
        try {
            rows = await this.prismaService[model].findMany({
                skip: (savePage - 1) * rowsPerPage,
                take: rowsPerPage,
            });
        }
        catch (error) {
            console.error(`Error fetching rows from model ${model}: `, error);
            rows = [];
        }
        return {
            currentPage: page,
            totalRow,
            rowsPerPage,
            totalPages,
            content: rows,
        };
    }
};
exports.UtilityService = UtilityService;
exports.UtilityService = UtilityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UtilityService);
//# sourceMappingURL=utility.service.js.map