import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { validate as isUUID } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('restaurants/:restaurantId/items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  private validateUUID(id: string, paramName: string) {
    if (!isUUID(id)) {
      throw new BadRequestException(`Invalid ${paramName}: ${id}. Must be a valid UUID.`);
    }
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Param('restaurantId') restaurantId: string,
    @Body() dto: CreateItemDto
  ) {
    this.validateUUID(restaurantId, 'restaurantId');
    if (dto.categoryId) {
      this.validateUUID(dto.categoryId, 'categoryId');
    }
    return this.itemService.create(restaurantId, dto);
  }

  @Get('for-category/:categoryId')
  findByCategory(
    @Param('restaurantId') restaurantId: string,
    @Param('categoryId') categoryId: string
  ) {
    this.validateUUID(restaurantId, 'restaurantId');
    this.validateUUID(categoryId, 'categoryId');
    return this.itemService.findByCategory(categoryId);
  }
@Get(':itemId')
getItem(
  @Param('restaurantId') restaurantId: string,
  @Param('itemId') itemId: string
) {
  this.validateUUID(restaurantId, 'restaurantId');
  this.validateUUID(itemId, 'itemId');
  return this.itemService.findOneForRestaurant(restaurantId, itemId);
}
  @Get()
  findAllForRestaurant(@Param('restaurantId') restaurantId: string) {
    this.validateUUID(restaurantId, 'restaurantId');
    return this.itemService.findAllForRestaurant(restaurantId);
  }


  @Patch(':itemId')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('itemId') itemId: string,
    @Body() dto: UpdateItemDto
  ) {
    this.validateUUID(itemId, 'itemId');
    if (dto.categoryId) {
      this.validateUUID(dto.categoryId, 'categoryId');
    }
    return this.itemService.update(itemId, dto);
  }

 @Delete(':itemId')
@UseGuards(AuthGuard('jwt'))
delete(@Param('itemId') itemId: string) {
  this.validateUUID(itemId, 'itemId');
  return this.itemService.delete(itemId); // ✅ بدل remove
}


  @Post(':itemId/upload-image')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/items',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async uploadImage(
    @Param('itemId') itemId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    this.validateUUID(itemId, 'itemId');
    return this.itemService.update(itemId, {
      imageUrl: `/uploads/items/${file.filename}`,
    });
  }

  @Delete(':itemId/image')
  @UseGuards(AuthGuard('jwt'))
  async deleteImage(@Param('itemId') itemId: string) {
    this.validateUUID(itemId, 'itemId');
    return this.itemService.update(itemId, {
      imageUrl: null,
    });
  }
}
