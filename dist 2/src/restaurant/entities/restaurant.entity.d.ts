import { User } from '../../user/entities/user.entity';
import { Menu } from '../menu/entities/menu.entity';
export declare class Restaurant {
    id: string;
    name: string;
    phone: string;
    location: string;
    cuisine: string;
    image: string;
    owner: User;
    ownerId: string;
    menus: Menu[];
}
