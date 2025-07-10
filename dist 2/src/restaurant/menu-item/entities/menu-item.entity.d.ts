import { MenuCategory } from '../../menu-category/entities/menu-category.entity';
export declare class MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: MenuCategory;
    categoryId: string;
}
