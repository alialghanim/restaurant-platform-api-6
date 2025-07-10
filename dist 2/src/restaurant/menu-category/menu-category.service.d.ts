import { Repository } from 'typeorm';
import { MenuCategory } from './entities/menu-category.entity';
import { CreateMenuCategoryDto } from './dto/create-menu-category.dto';
import { UpdateMenuCategoryDto } from './dto/update-menu-category.dto';
import { User } from '../../user/entities/user.entity';
import { Menu } from '../menu/entities/menu.entity';
export declare class MenuCategoryService {
    private readonly menuCategoryRepository;
    private readonly menuRepository;
    constructor(menuCategoryRepository: Repository<MenuCategory>, menuRepository: Repository<Menu>);
    create(dto: CreateMenuCategoryDto, menuId: string, user: User): Promise<MenuCategory>;
    findOne(id: string, user: User): Promise<MenuCategory>;
    findAllByMenu(menuId: string, user: User): Promise<MenuCategory[]>;
    update(id: string, dto: UpdateMenuCategoryDto, user: User): Promise<MenuCategory>;
    remove(id: string, user: User): Promise<void>;
}
