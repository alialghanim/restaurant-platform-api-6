import { RestaurantService } from './restaurant.service';
import { MenuService } from './menu/menu.service';
import type { CreateRestaurantDto } from './dto/create-restaurant.dto';
import type { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import type { Request } from 'express';
export declare class RestaurantController {
    private readonly restaurantService;
    private readonly menuService;
    constructor(restaurantService: RestaurantService, menuService: MenuService);
    findAllPublic(): Promise<Partial<import("./entities/restaurant.entity").Restaurant>[]>;
    create(createRestaurantDto: CreateRestaurantDto, req: Request): Promise<import("./entities/restaurant.entity").Restaurant>;
    findMyRestaurants(req: Request): Promise<import("./entities/restaurant.entity").Restaurant[]>;
    findMenusForRestaurant(id: string, req: Request): Promise<import("./menu/entities/menu.entity").Menu[]>;
    findOne(id: string, req: Request): Promise<import("./entities/restaurant.entity").Restaurant>;
    update(id: string, updateRestaurantDto: UpdateRestaurantDto, req: Request): Promise<import("./entities/restaurant.entity").Restaurant>;
    remove(id: string, req: Request): Promise<void>;
    uploadImage(id: string, file: Express.Multer.File, req: Request): Promise<import("./entities/restaurant.entity").Restaurant>;
}
