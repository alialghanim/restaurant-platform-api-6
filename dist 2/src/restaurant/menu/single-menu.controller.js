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
exports.SingleMenuController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const menu_service_1 = require("./menu.service");
const public_decorator_1 = require("../../auth/decorators/public.decorator");
let SingleMenuController = class SingleMenuController {
    constructor(menuService) {
        this.menuService = menuService;
    }
    findOne(restaurantId, id) {
        return this.menuService.findOne(id, restaurantId);
    }
    async update(restaurantId, id, updateMenuDto, req) {
        const user = req.user;
        return this.menuService.update(id, updateMenuDto, restaurantId, user);
    }
    async remove(restaurantId, id, req) {
        const user = req.user;
        return this.menuService.remove(id, restaurantId, user);
    }
};
exports.SingleMenuController = SingleMenuController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('restaurantId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], SingleMenuController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('restaurantId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Function, Object]),
    __metadata("design:returntype", Promise)
], SingleMenuController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('restaurantId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], SingleMenuController.prototype, "remove", null);
exports.SingleMenuController = SingleMenuController = __decorate([
    (0, common_1.Controller)('restaurants/:restaurantId/menus'),
    __metadata("design:paramtypes", [menu_service_1.MenuService])
], SingleMenuController);
//# sourceMappingURL=single-menu.controller.js.map