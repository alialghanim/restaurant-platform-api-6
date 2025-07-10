import { Restaurant } from '../../entities/restaurant.entity';
import { MenuCategory } from '../../menu-category/entities/menu-category.entity';
export declare class Menu {
    id: string;
    name: string;
    restaurant: Restaurant;
    restaurantId: string;
    categories: MenuCategory[];
}
