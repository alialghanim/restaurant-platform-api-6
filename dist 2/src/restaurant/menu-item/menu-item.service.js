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
exports.MenuItemService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const menu_item_entity_1 = require("./entities/menu-item.entity");
const menu_category_entity_1 = require("../menu-category/entities/menu-category.entity");
let MenuItemService = class MenuItemService {
    constructor(menuItemRepository, menuCategoryRepository) {
        this.menuItemRepository = menuItemRepository;
        this.menuCategoryRepository = menuCategoryRepository;
    }
    async create(dto, categoryId, user) {
        const category = await this.menuCategoryRepository.findOne({
            where: { id: categoryId },
            relations: { menu: { restaurant: { owner: true } } },
        });
        if (!category) {
            throw new common_1.NotFoundException(`Category with ID "${categoryId}" not found`);
        }
        if (category.menu.restaurant.owner.id !== user.id) {
            throw new common_1.ForbiddenException("You don't own this menu category.");
        }
        const newItem = this.menuItemRepository.create({ ...dto, category });
        return this.menuItemRepository.save(newItem);
    }
    async findOne(id, user) {
        const item = await this.menuItemRepository.findOne({
            where: { id },
            relations: { category: { menu: { restaurant: { owner: true } } } },
        });
        if (!item) {
            throw new common_1.NotFoundException(`Menu Item with ID "${id}" not found`);
        }
        if (item.category.menu.restaurant.owner.id !== user.id) {
            throw new common_1.ForbiddenException("You don't have permission to access this item.");
        }
        return item;
    }
    async findAllByCategory(categoryId, user) {
        const category = await this.menuCategoryRepository.findOne({
            where: { id: categoryId },
            relations: { menu: { restaurant: { owner: true } } },
        });
        if (!category) {
            throw new common_1.NotFoundException(`Category with ID "${categoryId}" not found`);
        }
        if (category.menu.restaurant.owner.id !== user.id) {
            throw new common_1.ForbiddenException("You don't have permission to access these items.");
        }
        return this.menuItemRepository.find({
            where: { category: { id: categoryId } },
        });
    }
    async update(id, dto, user) {
        const item = await this.findOne(id, user);
        Object.assign(item, dto);
        return this.menuItemRepository.save(item);
    }
    async remove(id, user) {
        const item = await this.findOne(id, user);
        await this.menuItemRepository.remove(item);
    }
};
exports.MenuItemService = MenuItemService;
exports.MenuItemService = MenuItemService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(menu_item_entity_1.MenuItem)),
    __param(1, (0, typeorm_1.InjectRepository)(menu_category_entity_1.MenuCategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MenuItemService);
//# sourceMappingURL=menu-item.service.js.map