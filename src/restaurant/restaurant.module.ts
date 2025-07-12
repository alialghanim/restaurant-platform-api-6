import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { AuthModule } from '../auth/auth.module';
import { PublicRestaurantController } from './public-restaurant.controller';
import { ItemModule } from './menu/item/item.module';
import { CategoryModule } from './menu/category/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurant]),
    AuthModule,
    ItemModule,
    CategoryModule,
  ],
  controllers: [
    RestaurantController,
    PublicRestaurantController,
  ],
  providers: [RestaurantService],
})
export class RestaurantModule {}