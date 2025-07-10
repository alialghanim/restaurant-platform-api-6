// src/restaurant/item/item.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../item/entities/item.entity';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Category } from '../category/entities/category.entity';
import { Restaurant } from '../entities/restaurant.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepo: Repository<Item>,

    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,

    @InjectRepository(Restaurant)
    private readonly restaurantRepo: Repository<Restaurant>,
  ) {}

  async findAllForRestaurant(restaurantId: string) {
    try {
      const items = await this.itemRepo.find({
        where: { restaurant: { id: restaurantId } },
        order: { createdAt: 'DESC' },
        relations: ['category', 'restaurant'],
      });

      if (!items) {
        throw new NotFoundException(`No items found for restaurant ${restaurantId}`);
      }

      return items;
    } catch (error) {
      if (error.code === '22P02') {
        throw new BadRequestException(`Invalid restaurant ID format: ${restaurantId}`);
      }
      throw error;
    }
  }

  async create(restaurantId: string, dto: CreateItemDto) {
    try {
      if (!dto.categoryId) {
        throw new NotFoundException('Category ID is required');
      }

      const [category, restaurant] = await Promise.all([
        this.categoryRepo.findOneBy({ id: dto.categoryId }),
        this.restaurantRepo.findOneBy({ id: restaurantId }),
      ]);

      if (!category) throw new NotFoundException(`Category with ID "${dto.categoryId}" not found`);
      if (!restaurant) throw new NotFoundException(`Restaurant with ID "${restaurantId}" not found`);

      const item = this.itemRepo.create({
        ...dto,
        category,
        categoryId: category.id,
        restaurant,
        restaurantId,
      });

      return await this.itemRepo.save(item);
    } catch (error) {
      if (error.code === '22P02') {
        throw new BadRequestException('Invalid UUID format provided');
      }
      throw error;
    }
  }

  async findByCategory(categoryId: string) {
    try {
      const category = await this.categoryRepo.findOneBy({ id: categoryId });
      if (!category) {
        throw new NotFoundException(`Category with ID "${categoryId}" not found`);
      }

      const items = await this.itemRepo.find({
        where: { categoryId },
        order: { createdAt: 'DESC' },
        relations: ['category', 'restaurant'],
      });

      return items;
    } catch (error) {
      if (error.code === '22P02') {
        throw new BadRequestException(`Invalid category ID format: ${categoryId}`);
      }
      throw error;
    }
  }

async update(id: string, dto: UpdateItemDto) {
  try {
    const item = await this.itemRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Item not found');

    const { categoryId, imageUrl, ...rest } = dto;

    if (categoryId) item.categoryId = categoryId;

    if ('imageUrl' in dto) {
      if (imageUrl === null || imageUrl === '') {
        item.imageUrl = null;
      } else {
        item.imageUrl = imageUrl;
      }
    }

    Object.assign(item, rest);

    await this.itemRepo.save(item);
    
    // Fetch fresh item after ensuring save is complete
    return await this.itemRepo.findOne({ 
      where: { id: item.id },
      relations: ['category', 'restaurant']
    });

  } catch (error) {
    if (error.code === '22P02') {
      throw new BadRequestException('Invalid UUID format provided');
    }
    throw error;
  }
}

  async delete(itemId: string) {
    try {
      const item = await this.itemRepo.findOne({
        where: { id: itemId },
        relations: ['category', 'restaurant'],
      });

      if (!item) {
        throw new NotFoundException(`Item with ID "${itemId}" not found`);
      }

      await this.itemRepo.remove(item);

      return { message: 'Item deleted successfully' };
    } catch (error) {
      if (error.code === '22P02') {
        throw new BadRequestException(`Invalid item ID format: ${itemId}`);
      }
      throw error;
    }
  }

  async findOneForRestaurant(restaurantId: string, itemId: string) {
    const item = await this.itemRepo.findOne({
      where: { id: itemId, restaurant: { id: restaurantId } },
      relations: ['category', 'restaurant'],
    });

    if (!item) {
      throw new NotFoundException(
        `Item with ID "${itemId}" not found in restaurant "${restaurantId}"`
      );
    }

    return item;
  }
}