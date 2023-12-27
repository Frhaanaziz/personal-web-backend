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
exports.ContentsController = void 0;
const common_1 = require("@nestjs/common");
const contents_service_1 = require("./contents.service");
const update_content_dto_1 = require("./dto/update-content.dto");
const create_content_dto_1 = require("./dto/create-content.dto");
const auth_guard_1 = require("../auth/auth-guard/auth.guard");
const admin_decorator_1 = require("../auth/admin.decorator");
let ContentsController = class ContentsController {
    constructor(contentsService) {
        this.contentsService = contentsService;
    }
    create(createContentDto) {
        return this.contentsService.create(createContentDto);
    }
    update(id, updateContentDto) {
        return this.contentsService.update({
            where: { id },
            data: updateContentDto,
        });
    }
};
exports.ContentsController = ContentsController;
__decorate([
    (0, admin_decorator_1.Admin)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_content_dto_1.CreateContentDto]),
    __metadata("design:returntype", void 0)
], ContentsController.prototype, "create", null);
__decorate([
    (0, admin_decorator_1.Admin)(),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_content_dto_1.UpdateContentDto]),
    __metadata("design:returntype", void 0)
], ContentsController.prototype, "update", null);
exports.ContentsController = ContentsController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('contents'),
    __metadata("design:paramtypes", [contents_service_1.ContentsService])
], ContentsController);
//# sourceMappingURL=contents.controller.js.map