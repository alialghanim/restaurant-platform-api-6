import { Menu } from '../../menu/entities/menu.entity';
import { MenuItem } from '../../menu-item/entities/menu-item.entity';
export declare class MenuCategory {
    id: string;
    name: string;
    menu: Menu;
    menuId: string;
    items: MenuItem[];
}
