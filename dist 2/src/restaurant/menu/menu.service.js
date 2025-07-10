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
exports.MenuService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const menu_entity_1 = require("./entities/menu.entity");
const restaurant_entity_1 = require("../entities/restaurant.entity");
let MenuService = class MenuService {
    constructor(menuRepository, restaurantRepository) {
        this.menuRepository = menuRepository;
        this.restaurantRepository = restaurantRepository;
    }
    async create(createMenuDto, restaurantId, user) {
        const restaurant = await this.restaurantRepository.findOne({
            where: { id: restaurantId },
            relations: ['owner'],
        });
        if (!restaurant) {
            throw new common_1.NotFoundException('Restaurant not found');
        }
        if (restaurant.owner.id !== user.id) {
            throw new common_1.ForbiddenException('You do not own this restaurant');
        }
        const menu = this.menuRepository.create({
            name: createMenuDto.name,
            restaurant,
        });
        return this.menuRepository.save(menu);
    }
    async findOne(id, restaurantId) {
        const menu = await this.menuRepository.findOne({
            where: { id, restaurant: { id: restaurantId } },
            relations: ['restaurant', 'restaurant.owner'],
        });
        if (!menu) {
            throw new common_1.NotFoundException('Menu not found');
        }
        return menu;
    }
    async update(id, updateMenuDto, restaurantId, user) {
        const menu = await this.menuRepository.findOne({
            where: { id, restaurant: { id: restaurantId } },
            relations: ['restaurant', 'restaurant.owner'],
        });
        if (!menu) {
            throw new common_1.NotFoundException('Menu not found');
        }
        if (menu.restaurant.owner.id !== user.id) {
            throw new common_1.ForbiddenException('You do not own this restaurant');
        }
        Object.assign(menu, updateMenuDto);
        return this.menuRepository.save(menu);
    }
    async remove(id, restaurantId, user) {
        const menu = await this.menuRepository.findOne({
            where: { id, restaurant: { id: restaurantId } },
            relations: ['restaurant', 'restaurant.owner'],
        });
        if (!menu) {
            throw new common_1.NotFoundException('Menu not found');
        }
        if (menu.restaurant.owner.id !== user.id) {
            throw new common_1.ForbiddenException('You do not own this restaurant');
        }
        await this.menuRepository.remove(menu);
    }
    async findAllByRestaurant(restaurantId, user) {
        const restaurant = await this.restaurantRepository.findOne({
            where: { id: restaurantId },
            relations: ['owner'],
        });
        if (!restaurant) {
            throw new common_1.NotFoundException('Restaurant not found');
        }
        if (restaurant.owner.id !== user.id) {
            throw new common_1.ForbiddenException('You do not own this restaurant');
        }
        return this.menuRepository.find({
            where: { restaurant: { id: restaurantId } },
            relations: ['restaurant'],
        });
    }
};
exports.MenuService = MenuService;
exports.MenuService = MenuService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(menu_entity_1.Menu)),
    __param(1, (0, typeorm_1.InjectRepository)(restaurant_entity_1.Restaurant)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MenuService);
//# sourceMappingURL=menu.service.js.map