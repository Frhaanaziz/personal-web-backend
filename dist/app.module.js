"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const config_schema_1 = require("./config.schema");
const auth_module_1 = require("./auth/auth.module");
const users_controller_1 = require("./users/users.controller");
const users_module_1 = require("./users/users.module");
const auth_controller_1 = require("./auth/auth.controller");
const users_service_1 = require("./users/users.service");
const auth_service_1 = require("./auth/auth.service");
const contents_module_1 = require("./contents/contents.module");
const keywords_module_1 = require("./keywords/keywords.module");
const utility_module_1 = require("./utility/utility.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                validationSchema: config_schema_1.configValidationSchema,
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            contents_module_1.ContentsModule,
            keywords_module_1.KeywordsModule,
            utility_module_1.UtilityModule,
        ],
        controllers: [app_controller_1.AppController, users_controller_1.UsersController, auth_controller_1.AuthController],
        providers: [app_service_1.AppService, users_service_1.UsersService, auth_service_1.AuthService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map