import { MenuService } from './menu.service';
import type { CreateMenuDto } from './dto/create-menu.dto';
import type { UpdateMenuDto } from './dto/update-menu.dto';
import type { Request } from 'express';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    create(restaurantId: string, createMenuDto: CreateMenuDto, req: Request): Promise<import("./entities/menu.entity").Menu>;
    findOne(restaurantId: string, id: string): Promise<import("./entities/menu.entity").Menu>;
    update(restaurantId: string, id: string, updateMenuDto: UpdateMenuDto, req: Request): Promise<import("./entities/menu.entity").Menu>;
    remove(restaurantId: string, id: string, req: Request): Promise<void>;
}
