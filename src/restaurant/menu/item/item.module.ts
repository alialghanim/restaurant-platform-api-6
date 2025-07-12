// src/restaurant/menu/item/item.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Section } from './entities/section.entity';
import { Option } from './entities/option.entity';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { Category } from '../category/entities/category.entity'; // ✅
import { CategoryModule } from '../category/category.module'; // ✅
import { Restaurant } from '../../entities/restaurant.entity'; // ✅

@Module({
  imports: [
    TypeOrmModule.forFeature([Item, Section, Option, Category, Restaurant]), // ✅ أضف Category و Restaurant
    CategoryModule, // ✅ أضف هذا
  ],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService, TypeOrmModule],
})
export class ItemModule {}