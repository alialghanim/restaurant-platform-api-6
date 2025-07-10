import { MenuItemService } from './menu-item.service';
import type { Request } from 'express';
import type { UpdateMenuItemDto } from './dto/update-menu-item.dto';
export declare class SingleMenuItemController {
    private readonly menuItemService;
    constructor(menuItemService: MenuItemService);
    findOne(id: string, req: Request): Promise<import("./entities/menu-item.entity").MenuItem>;
    update(id: string, updateDto: UpdateMenuItemDto, req: Request): Promise<import("./entities/menu-item.entity").MenuItem>;
    remove(id: string, req: Request): Promise<void>;
}
