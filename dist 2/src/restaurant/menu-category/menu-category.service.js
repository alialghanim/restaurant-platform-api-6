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
exports.MenuCategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const menu_category_entity_1 = require("./entities/menu-category.entity");
const menu_entity_1 = require("../menu/entities/menu.entity");
let MenuCategoryService = class MenuCategoryService {
    constructor(menuCategoryRepository, menuRepository) {
        this.menuCategoryRepository = menuCategoryRepository;
        this.menuRepository = menuRepository;
    }
    async create(dto, menuId, user) {
        const menu = await this.menuRepository.findOne({
            where: { id: menuId },
            relations: { restaurant: { owner: true } },
        });
        if (!menu) {
            throw new common_1.NotFoundException(`Menu with ID "${menuId}" not found`);
        }
        if (menu.restaurant.owner.id !== user.id) {
            throw new common_1.ForbiddenException("You don't have permission to add a category to this menu.");
        }
        const newCategory = this.menuCategoryRepository.create({ ...dto, menu });
        return this.menuCategoryRepository.save(newCategory);
    }
    async findOne(id, user) {
        const category = await this.menuCategoryRepository.findOne({
            where: { id },
            relations: { menu: { restaurant: { owner: true } } },
        });
        if (!category) {
            throw new common_1.NotFoundException(`Category with ID "${id}" not found`);
        }
        if (category.menu.restaurant.owner.id !== user.id) {
            throw new common_1.ForbiddenException("You don't have permission to access this category.");
        }
        return category;
    }
    async findAllByMenu(menuId, user) {
        const menu = await this.menuRepository.findOne({
            where: { id: menuId },
            relations: { restaurant: { owner: true } },
        });
        if (!menu) {
            throw new common_1.NotFoundException(`Menu with ID "${menuId}" not found`);
        }
        if (menu.restaurant.owner.id !== user.id) {
            throw new common_1.ForbiddenException("You don't have permission to access these categories.");
        }
        return this.menuCategoryRepository.find({
            where: { menu: { id: menuId } },
            relations: { items: true },
        });
    }
    async update(id, dto, user) {
        const category = await this.findOne(id, user);
        Object.assign(category, dto);
        return this.menuCategoryRepository.save(category);
    }
    async remove(id, user) {
        const category = await this.findOne(id, user);
        await this.menuCategoryRepository.remove(category);
    }
};
exports.MenuCategoryService = MenuCategoryService;
exports.MenuCategoryService = MenuCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(menu_category_entity_1.MenuCategory)),
    __param(1, (0, typeorm_1.InjectRepository)(menu_entity_1.Menu)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MenuCategoryService);
//# sourceMappingURL=menu-category.service.js.map