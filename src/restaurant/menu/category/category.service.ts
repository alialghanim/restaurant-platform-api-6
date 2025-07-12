import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async create(name: string, restaurantId: string) {
    const category = this.categoryRepo.create({
      name,
      restaurant: { id: restaurantId },
    });
    return this.categoryRepo.save(category);
  }

  async findAll(restaurantId: string) {
    return this.categoryRepo.find({
      where: { restaurant: { id: restaurantId } },
      order: { createdAt: 'DESC' },
    });
  }

  async delete(id: string) {
    const category = await this.categoryRepo.findOneBy({ id });
    if (!category) throw new NotFoundException('Category not found');
    return this.categoryRepo.remove(category);
  }
}
