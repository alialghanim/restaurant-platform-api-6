import type { Request } from 'express';
import { MenuCategoryService } from '../menu-category/menu-category.service';
import type { CreateMenuCategoryDto } from '../menu-category/dto/create-menu-category.dto';
export declare class MenuCategoriesController {
    private readonly menuCategoryService;
    constructor(menuCategoryService: MenuCategoryService);
    findAllByMenu(menuId: string, req: Request): Promise<import("../menu-category/entities/menu-category.entity").MenuCategory[]>;
    create(menuId: string, createDto: CreateMenuCategoryDto, req: Request): Promise<import("../menu-category/entities/menu-category.entity").MenuCategory>;
}
