// FILE: src/restaurant/restaurant.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { AuthModule } from '../auth/auth.module';
import { PublicRestaurantController } from './public-restaurant.controller';
import { Category } from './category/entities/category.entity';
import { Item } from './item/entities/item.entity';

import { ItemController } from './item/item.controller';
import { ItemService } from './item/item.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurant, Category, Item]),
    AuthModule,
  ],
  controllers: [
    RestaurantController,
    PublicRestaurantController,
    ItemController, // ✅ أضف هذا
  ],
  providers: [
    RestaurantService,
    ItemService, // ✅ وأيضًا هذا
  ],
})
export class RestaurantModule {}
