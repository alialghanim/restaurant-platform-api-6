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
exports.RestaurantService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const restaurant_entity_1 = require("./entities/restaurant.entity");
let RestaurantService = class RestaurantService {
    constructor(restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }
    async create(dto, owner) {
        const restaurant = this.restaurantRepository.create({ ...dto, owner });
        return this.restaurantRepository.save(restaurant);
    }
    async findMyRestaurants(owner) {
        return this.restaurantRepository.find({ where: { ownerId: owner.id } });
    }
    async findOne(id) {
        const restaurant = await this.restaurantRepository.findOne({
            where: { id },
            relations: { owner: true },
        });
        if (!restaurant) {
            throw new common_1.NotFoundException(`Restaurant with ID "${id}" not found`);
        }
        return restaurant;
    }
    async update(id, dto, user) {
        const restaurant = await this.findOne(id);
        if (restaurant.ownerId !== user.id) {
            throw new common_1.ForbiddenException("You don't own this restaurant.");
        }
        Object.assign(restaurant, dto);
        return this.restaurantRepository.save(restaurant);
    }
    async remove(id, user) {
        const restaurant = await this.findOne(id);
        if (restaurant.ownerId !== user.id) {
            throw new common_1.ForbiddenException("You don't own this restaurant.");
        }
        await this.restaurantRepository.remove(restaurant);
    }
    async updateImage(id, user, imagePath) {
        const restaurant = await this.findOne(id);
        if (restaurant.ownerId !== user.id) {
            throw new common_1.ForbiddenException("You don't own this restaurant.");
        }
        restaurant.image = imagePath;
        return this.restaurantRepository.save(restaurant);
    }
    async findAllPublic() {
        return this.restaurantRepository.find({
            select: ['id', 'name', 'image', 'cuisine'],
        });
    }
};
exports.RestaurantService = RestaurantService;
exports.RestaurantService = RestaurantService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(restaurant_entity_1.Restaurant)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RestaurantService);
//# sourceMappingURL=restaurant.service.js.map