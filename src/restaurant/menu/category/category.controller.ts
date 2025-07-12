import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  BadRequestException,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { validate as isUUID } from 'uuid';
import { CategoryService } from './category.service';

@Controller('restaurants/:restaurantId/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  private validateUUID(id: string, name = 'id') {
    if (!isUUID(id)) throw new BadRequestException(`${name} is not a valid UUID`);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Param('restaurantId') restaurantId: string,
    @Body() body: { name: string },
  ) {
    this.validateUUID(restaurantId, 'restaurantId');
    return this.categoryService.create(body.name, restaurantId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id') id: string) {
    this.validateUUID(id, 'id');
    return this.categoryService.delete(id);
  }

  @Get()
  async findAll(@Param('restaurantId') restaurantId: string) {
    this.validateUUID(restaurantId, 'restaurantId');
    return this.categoryService.findAll(restaurantId);
  }
}