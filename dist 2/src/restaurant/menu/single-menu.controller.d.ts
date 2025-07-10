import type { Request } from 'express';
import { MenuService } from './menu.service';
import type { UpdateMenuDto } from './dto/update-menu.dto';
export declare class SingleMenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    findOne(restaurantId: string, id: string): Promise<import("./entities/menu.entity").Menu>;
    update(restaurantId: string, id: string, updateMenuDto: UpdateMenuDto, req: Request): Promise<import("./entities/menu.entity").Menu>;
    remove(restaurantId: string, id: string, req: Request): Promise<void>;
}
