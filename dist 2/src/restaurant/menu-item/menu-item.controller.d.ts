import { MenuItemService } from './menu-item.service';
import type { CreateMenuItemDto } from './dto/create-menu-item.dto';
import type { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import type { Request } from 'express';
export declare class MenuItemController {
    private readonly menuItemService;
    constructor(menuItemService: MenuItemService);
    create(categoryId: string, createDto: CreateMenuItemDto, req: Request): Promise<import("./entities/menu-item.entity").MenuItem>;
    findAllByCategory(categoryId: string, req: Request): Promise<import("./entities/menu-item.entity").MenuItem[]>;
    findOne(id: string, req: Request): Promise<import("./entities/menu-item.entity").MenuItem>;
    update(id: string, updateDto: UpdateMenuItemDto, req: Request): Promise<import("./entities/menu-item.entity").MenuItem>;
    remove(id: string, req: Request): Promise<void>;
}
