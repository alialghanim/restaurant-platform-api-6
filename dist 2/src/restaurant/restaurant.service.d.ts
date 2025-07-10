import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { User } from '../user/entities/user.entity';
export declare class RestaurantService {
    private readonly restaurantRepository;
    constructor(restaurantRepository: Repository<Restaurant>);
    create(dto: CreateRestaurantDto, owner: User): Promise<Restaurant>;
    findMyRestaurants(owner: User): Promise<Restaurant[]>;
    findOne(id: string): Promise<Restaurant>;
    update(id: string, dto: UpdateRestaurantDto, user: User): Promise<Restaurant>;
    remove(id: string, user: User): Promise<void>;
    updateImage(id: string, user: User, imagePath: string): Promise<Restaurant>;
    findAllPublic(): Promise<Partial<Restaurant>[]>;
}
