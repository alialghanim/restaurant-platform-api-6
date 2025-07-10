import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Restaurant } from '../entities/restaurant.entity';
import { User } from '../../user/entities/user.entity';
export declare class MenuService {
    private readonly menuRepository;
    private readonly restaurantRepository;
    constructor(menuRepository: Repository<Menu>, restaurantRepository: Repository<Restaurant>);
    create(createMenuDto: CreateMenuDto, restaurantId: string, user: User): Promise<Menu>;
    findOne(id: string, restaurantId: string): Promise<Menu>;
    update(id: string, updateMenuDto: UpdateMenuDto, restaurantId: string, user: User): Promise<Menu>;
    remove(id: string, restaurantId: string, user: User): Promise<void>;
    findAllByRestaurant(restaurantId: string, user: User): Promise<Menu[]>;
}
