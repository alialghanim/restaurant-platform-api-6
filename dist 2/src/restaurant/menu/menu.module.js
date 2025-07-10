"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const menu_entity_1 = require("./entities/menu.entity");
const menu_controller_1 = require("./menu.controller");
const menu_service_1 = require("./menu.service");
const restaurant_entity_1 = require("../entities/restaurant.entity");
const menu_category_entity_1 = require("../menu-category/entities/menu-category.entity");
const menu_item_entity_1 = require("../menu-item/entities/menu-item.entity");
const menu_categories_controller_1 = require("./menu-categories.controller");
const menu_category_service_1 = require("../menu-category/menu-category.service");
let MenuModule = class MenuModule {
};
exports.MenuModule = MenuModule;
exports.MenuModule = MenuModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([menu_entity_1.Menu, restaurant_entity_1.Restaurant, menu_category_entity_1.MenuCategory, menu_item_entity_1.MenuItem]),
        ],
        controllers: [menu_controller_1.MenuController, menu_categories_controller_1.MenuCategoriesController],
        providers: [menu_service_1.MenuService, menu_category_service_1.MenuCategoryService],
        exports: [menu_service_1.MenuService, typeorm_1.TypeOrmModule],
    })
], MenuModule);
//# sourceMappingURL=menu.module.js.map