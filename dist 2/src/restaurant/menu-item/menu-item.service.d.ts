import { Repository } from 'typeorm';
import { MenuItem } from './entities/menu-item.entity';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { MenuCategory } from '../menu-category/entities/menu-category.entity';
import { User } from '../../user/entities/user.entity';
export declare class MenuItemService {
    private readonly menuItemRepository;
    private readonly menuCategoryRepository;
    constructor(menuItemRepository: Repository<MenuItem>, menuCategoryRepository: Repository<MenuCategory>);
    create(dto: CreateMenuItemDto, categoryId: string, user: User): Promise<MenuItem>;
    findOne(id: string, user: User): Promise<MenuItem>;
    findAllByCategory(categoryId: string, user: User): Promise<MenuItem[]>;
    update(id: string, dto: UpdateMenuItemDto, user: User): Promise<MenuItem>;
    remove(id: string, user: User): Promise<void>;
}
