"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuCategoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const menu_category_entity_1 = require("./entities/menu-category.entity");
const menu_category_controller_1 = require("./menu-category.controller");
const menu_category_service_1 = require("./menu-category.service");
const menu_module_1 = require("../menu/menu.module");
let MenuCategoryModule = class MenuCategoryModule {
};
exports.MenuCategoryModule = MenuCategoryModule;
exports.MenuCategoryModule = MenuCategoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([menu_category_entity_1.MenuCategory]), menu_module_1.MenuModule],
        controllers: [menu_category_controller_1.MenuCategoryController],
        providers: [menu_category_service_1.MenuCategoryService],
        exports: [menu_category_service_1.MenuCategoryService, typeorm_1.TypeOrmModule],
    })
], MenuCategoryModule);
//# sourceMappingURL=menu-category.module.js.map