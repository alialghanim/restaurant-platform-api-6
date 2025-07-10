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
exports.MenuCategoryController = void 0;
const common_1 = require("@nestjs/common");
const menu_category_service_1 = require("./menu-category.service");
const passport_1 = require("@nestjs/passport");
let MenuCategoryController = class MenuCategoryController {
    constructor(menuCategoryService) {
        this.menuCategoryService = menuCategoryService;
    }
    create(menuId, createDto, req) {
        const user = req.user;
        return this.menuCategoryService.create(createDto, menuId, user);
    }
    findAllByMenu(menuId, req) {
        const user = req.user;
        return this.menuCategoryService.findAllByMenu(menuId, user);
    }
    createForMenu(menuId, createDto, req) {
        const user = req.user;
        return this.menuCategoryService.create(createDto, menuId, user);
    }
    findAllCategoriesForMenu(menuId, req) {
        const user = req.user;
        return this.menuCategoryService.findAllByMenu(menuId, user);
    }
    findOne(id, req) {
        const user = req.user;
        return this.menuCategoryService.findOne(id, user);
    }
    update(id, dto, req) {
        const user = req.user;
        return this.menuCategoryService.update(id, dto, user);
    }
    remove(id, req) {
        const user = req.user;
        return this.menuCategoryService.remove(id, user);
    }
};
exports.MenuCategoryController = MenuCategoryController;
__decorate([
    (0, common_1.Post)('for-menu/:menuId'),
    __param(0, (0, common_1.Param)('menuId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Object]),
    __metadata("design:returntype", void 0)
], MenuCategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('for-menu/:menuId'),
    __param(0, (0, common_1.Param)('menuId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MenuCategoryController.prototype, "findAllByMenu", null);
__decorate([
    (0, common_1.Post)('/menus/:menuId/categories'),
    __param(0, (0, common_1.Param)('menuId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Object]),
    __metadata("design:returntype", void 0)
], MenuCategoryController.prototype, "createForMenu", null);
__decorate([
    (0, common_1.Get)('/menus/:menuId/categories'),
    __param(0, (0, common_1.Param)('menuId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MenuCategoryController.prototype, "findAllCategoriesForMenu", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MenuCategoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Object]),
    __metadata("design:returntype", void 0)
], MenuCategoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MenuCategoryController.prototype, "remove", null);
exports.MenuCategoryController = MenuCategoryController = __decorate([
    (0, common_1.Controller)('menu-categories'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [menu_category_service_1.MenuCategoryService])
], MenuCategoryController);
//# sourceMappingURL=menu-category.controller.js.map