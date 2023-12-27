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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeywordsController = void 0;
const common_1 = require("@nestjs/common");
const keywords_service_1 = require("./keywords.service");
const create_keyword_dto_1 = require("./dto/create-keyword.dto");
const update_keyword_dto_1 = require("./dto/update-keyword.dto");
const find_all_keywords_dto_1 = require("./dto/find-all-keywords.dto");
const auth_guard_1 = require("../auth/auth-guard/auth.guard");
const admin_decorator_1 = require("../auth/admin.decorator");
let KeywordsController = class KeywordsController {
    constructor(keywordsService) {
        this.keywordsService = keywordsService;
    }
    findAll(findAllKeywordsDto) {
        const { page, group, locale } = findAllKeywordsDto;
        if (page)
            return this.keywordsService.findAll({ page: Number(page) });
        if (group && locale)
            return this.keywordsService.findMany({
                where: { group },
                include: {
                    Content: {
                        where: {
                            locale,
                        },
                    },
                },
            });
        throw new common_1.BadRequestException('Missing query params');
    }
    findById(id) {
        return this.keywordsService.findOne({ id });
    }
    create(createKeywordDto) {
        return this.keywordsService.create(createKeywordDto);
    }
    update(id, updateKeywordDto) {
        return this.keywordsService.update({
            where: { id },
            data: updateKeywordDto,
        });
    }
    remove(id) {
        return this.keywordsService.delete({
            id,
        });
    }
};
exports.KeywordsController = KeywordsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_all_keywords_dto_1.FindAllKeywordsDto]),
    __metadata("design:returntype", void 0)
], KeywordsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], KeywordsController.prototype, "findById", null);
__decorate([
    (0, admin_decorator_1.Admin)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_keyword_dto_1.CreateKeywordDto]),
    __metadata("design:returntype", void 0)
], KeywordsController.prototype, "create", null);
__decorate([
    (0, admin_decorator_1.Admin)(),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_keyword_dto_1.UpdateKeywordDto]),
    __metadata("design:returntype", void 0)
], KeywordsController.prototype, "update", null);
__decorate([
    (0, admin_decorator_1.Admin)(),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], KeywordsController.prototype, "remove", null);
exports.KeywordsController = KeywordsController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('keywords'),
    __metadata("design:paramtypes", [keywords_service_1.KeywordsService])
], KeywordsController);
//# sourceMappingURL=keywords.controller.js.map