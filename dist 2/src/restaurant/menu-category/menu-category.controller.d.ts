import { MenuCategoryService } from './menu-category.service';
import type { CreateMenuCategoryDto } from './dto/create-menu-category.dto';
import type { UpdateMenuCategoryDto } from './dto/update-menu-category.dto';
import type { Request } from 'express';
export declare class MenuCategoryController {
    private readonly menuCategoryService;
    constructor(menuCategoryService: MenuCategoryService);
    create(menuId: string, createDto: CreateMenuCategoryDto, req: Request): Promise<import("./entities/menu-category.entity").MenuCategory>;
    findAllByMenu(menuId: string, req: Request): Promise<import("./entities/menu-category.entity").MenuCategory[]>;
    createForMenu(menuId: string, createDto: CreateMenuCategoryDto, req: Request): Promise<import("./entities/menu-category.entity").MenuCategory>;
    findAllCategoriesForMenu(menuId: string, req: Request): Promise<import("./entities/menu-category.entity").MenuCategory[]>;
    findOne(id: string, req: Request): Promise<import("./entities/menu-category.entity").MenuCategory>;
    update(id: string, dto: UpdateMenuCategoryDto, req: Request): Promise<import("./entities/menu-category.entity").MenuCategory>;
    remove(id: string, req: Request): Promise<void>;
}
