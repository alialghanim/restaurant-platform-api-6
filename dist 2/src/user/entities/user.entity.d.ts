import { Restaurant } from '../../restaurant/entities/restaurant.entity';
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    restaurants: Restaurant[];
}
