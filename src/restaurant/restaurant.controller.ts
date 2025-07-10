import {
  Controller,
  Get,
  ConflictException,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put, 
  UseGuards,
  Req,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  ForbiddenException,
  UploadedFile,
  UseInterceptors,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RestaurantService } from './restaurant.service';
import type { CreateRestaurantDto } from './dto/create-restaurant.dto';
import type { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import type { Request } from 'express';
import type { User } from '../user/entities/user.entity';
import { Public } from '../auth/decorators/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Item } from './item/entities/item.entity';
import { RestaurantLocationDto } from './dto/restaurant-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity'; // تأكد من المسار الصحيح
import { UpdateRestaurantIdentityDto } from './dto/restaurant-identity.dto';
import { UpdateRestaurantContactDto } from './dto/restaurant-contact.dto';

@Controller('restaurants')
@UseGuards(JwtAuthGuard)
export class RestaurantController {
  private readonly logger = new Logger(RestaurantController.name);

  constructor(
    private readonly restaurantService: RestaurantService,
    @InjectRepository(Restaurant)
    private readonly restaurantRepo: Repository<Restaurant> // ✅ هنا
  ) {}

  @Public()
  @Get()
  findAllPublic() {
    return this.restaurantService.findAllPublic();
  }

@Post()
async create(
  @Body() createRestaurantDto: CreateRestaurantDto,
  @Req() req: Request,
) {
  const user = req.user as User;

  if (!user?.id) {
    this.logger.error('User info is missing in create restaurant request');
    throw new InternalServerErrorException('User info not found in request');
  }

  this.logger.log(`Creating restaurant: ${createRestaurantDto.name} for user: ${user.id}`);
  return this.restaurantService.create(createRestaurantDto, user);
}

  @Get('my-restaurants')
  findMyRestaurants(@Req() req: Request) {
    const user = req.user as User;
    return this.restaurantService.findMyRestaurants(user);
  }

@Patch('me')
async updateMyRestaurant(
  @Body() dto: UpdateRestaurantDto,
  @Req() req: Request,
) {
  const user = req.user as User;
  return this.restaurantService.updateByOwner(user.id, dto); // ✅ ممتاز، خلك عليه
}

  @Get('me') // ✅ يجب أن يكون قبل ':id'
getMyRestaurant(@Req() req: Request) {
  const user = req.user as User;
  return this.restaurantService.findByOwnerId(user.id);
}

@Get('check-domain/:domain')
async checkDomain(@Param('domain') domain: string) {
  const exists = await this.restaurantRepo.findOne({ where: { domainName: domain } });
  if (exists) {
    throw new ConflictException('Domain is already taken');
  }
  return { available: true };
}

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string, @Req() req: Request) {
    const user = req.user as User;
    const restaurant = await this.restaurantService.findOne(id);
    if (restaurant.ownerId !== user.id) {
      throw new ForbiddenException(
        "You don't have permission to view this restaurant.",
      );
    }
    return restaurant;
  }

  @Get('me/location')
async getMyRestaurantLocation(@Req() req: Request) {
  const user = req.user as User;
  return this.restaurantService.getLocationByOwner(user.id);
}

@Get('domain')
@Public()
async getRestaurantByDomainFromHost(@Req() req: Request) {
const hostname = req.headers.host?.split(':')[0]?.toLowerCase();
  return this.restaurantService.findOnePublicByDomain(hostname);
}

@Get('domain/:domain')
findOneByDomain(@Param('domain') domain: string) {
  return this.restaurantService.findOnePublicByDomain(domain);
}

  @Patch(':id')
async update(
  @Param('id', ParseUUIDPipe) id: string,
  @Body() dto: UpdateRestaurantDto,
  @Req() req: Request,
) {
  const user = req.user as User;
  this.logger.log(`Updating restaurant: ${id} for user: ${user.id}`);
  return this.restaurantService.update(id, dto, user);
}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string, @Req() req: Request) {
    const user = req.user as User;
    return this.restaurantService.remove(id, user);
  }

 @Patch('me/identity')
updateIdentity(@Body() dto: UpdateRestaurantIdentityDto, @Req() req: Request) {
  const user = req.user as User;
  return this.restaurantService.updateIdentityByOwner(user.id, dto);
}

@Patch('me/contact')
updateContact(@Body() dto: UpdateRestaurantContactDto, @Req() req: Request) {
  const user = req.user as User;
  return this.restaurantService.updateContactByOwner(user.id, dto);
}

@Patch('me/domain')
updateDomain(@Body() body: { domainName: string }, @Req() req: Request) {
  const user = req.user as User;
  return this.restaurantService.updateDomainByOwner(user.id, body.domainName);
}

@Put('me/location')
async updateMyRestaurantLocation(
  @Body() dto: RestaurantLocationDto,
  @Req() req: Request,
) {
  const user = req.user as User;
  return this.restaurantService.updateLocationByOwner(user.id, dto);
}

@Post(':id/categories')
async createCategory(
  @Param('id', ParseUUIDPipe) restaurantId: string,
  @Body() body: { name: string; description?: string },
  @Req() req: Request,
) {
  const user = req.user as User;
  return this.restaurantService.createCategory(restaurantId, user, body);
}

  @Get(':id/categories')
  async getRestaurantCategories(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: Request,
  ) {
    const user = req.user as User;
    return this.restaurantService.getCategories(id, user);
  }
@Post(':restaurantId/categories/:categoryId/items')
@UseInterceptors(FileInterceptor('file'))
async createItem(
  @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
  @Param('categoryId', ParseUUIDPipe) categoryId: string,
  @UploadedFile() file: Express.Multer.File,
  @Body() body: any,
  @Req() req: Request,
) {
  const user = req.user as User;
  const imageUrl = file ? `/uploads/items/${file.filename}` : undefined;

  return this.restaurantService.createItem(restaurantId, categoryId, user, {
    ...body,
    price: parseFloat(body.price),
    imageUrl,
  });
}

@Patch(':restaurantId/items/:itemId')
@UseInterceptors(FileInterceptor('file'))
async updateItem(
  @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
  @Param('itemId', ParseUUIDPipe) itemId: string,
  @UploadedFile() file: Express.Multer.File,
  @Body() body: any,
  @Req() req: Request,
) {
  const user = req.user as User;
  const imageUrl = file ? `/uploads/items/${file.filename}` : undefined;

  return this.restaurantService.updateItem(
    restaurantId,
    itemId,
    user,
    {
      ...body,
      price: parseFloat(body.price),
      imageUrl,
    },
    body.categoryIds // Array of category IDs
  );
}

@Get(':restaurantId/categories/:categoryId/items')
async getCategoryItems(
  @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
  @Param('categoryId', ParseUUIDPipe) categoryId: string,
  @Req() req: Request,
): Promise<Item[]> {
  const user = req.user as User;
  return this.restaurantService.getCategoryItems(restaurantId, categoryId, user);
}

  @Post(':id/upload-image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/restaurants',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `restaurant-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async uploadImage(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const user = req.user as User;
    const imagePath = `/uploads/restaurants/${file.filename}`;
    
    // Save the image path to the database
    const updatedRestaurant = await this.restaurantService.updateImage(id, user, imagePath);
    
    return updatedRestaurant;
  }

  @Delete(':id/remove-image')
  async removeImage(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: Request,
  ) {
    const user = req.user as User;
    const updatedRestaurant = await this.restaurantService.removeImage(id, user);
    return updatedRestaurant;
  }

}
