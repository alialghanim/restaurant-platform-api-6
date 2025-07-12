import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { User } from '../user/entities/user.entity';
import { Category } from './menu/category/entities/category.entity';
import { Item } from './menu/item/entities/item.entity';
import { In } from 'typeorm';
import { RestaurantLocationDto } from './dto/restaurant-location.dto';

type RestaurantLocation = {
  lat: number;
  lng: number;
  address1: string;
  address2: string;
  city: string;
  country: string;
  postcode: string;
};

@Injectable()
export class RestaurantService {
  private readonly logger = new Logger(RestaurantService.name);

  constructor(
  @InjectRepository(Restaurant)
  private readonly restaurantRepository: Repository<Restaurant>,

  @InjectRepository(Category)
  private readonly categoryRepository: Repository<Category>,

  @InjectRepository(Item)
  private readonly itemRepository: Repository<Item>,
) {}

async updateByOwner(ownerId: string, dto: UpdateRestaurantDto)
 {
this.logger.log(`Updating restaurant for owner ${ownerId}`, dto);
const restaurant = await this.restaurantRepository.findOne({ where: { ownerId } });
  if (!restaurant) throw new NotFoundException('Restaurant not found for user');

  // ✅ لا تسمح بتغيير الدومين بعد ما ينحط أول مرة
  if (restaurant.domainName && dto.domainName && dto.domainName !== restaurant.domainName) {
    throw new ForbiddenException('Domain name cannot be changed once set.');
  }

  // ✅ تحقق من التكرار فقط لو الدومين جديد ولم يكن موجود من قبل
  if (!restaurant.domainName && dto.domainName) {
    const existing = await this.restaurantRepository.findOne({ where: { domainName: dto.domainName } });
    if (existing && existing.id !== restaurant.id) {
      throw new ForbiddenException('Domain name is already taken.');
    }
  }

  // فقط انسخ القيم التي ليست undefined إلى الكيان
for (const [key, value] of Object.entries(dto)) {
  if (value !== undefined) {
    (restaurant as any)[key] = value;
  }
}

return await this.restaurantRepository.save(restaurant);
}

async findByOwnerId(ownerId: string) {
let restaurant = await this.restaurantRepository.findOne({
  where: { ownerId },
  select: [
    'id',
    'name',
    'description',
    'storeColor',
    'domainName',
    'logo',
    'image',
    'restaurantLocation',
    'status',
    'contactNumber',
  ],
});

  if (!restaurant) {
    // ✅ أنشئ مطعم فاضي افتراضي
    restaurant = this.restaurantRepository.create({
      ownerId,
      name: '',
      description: '',
      storeColor: '',
      restaurantLocation: null,
      domainName: null,
    });
    restaurant = await this.restaurantRepository.save(restaurant);
  }

  return restaurant;
}

  async create(dto: CreateRestaurantDto, owner: User): Promise<Restaurant> {
  if (!owner || !owner.id) {
    this.logger.error('Owner info is missing or invalid');
    throw new InternalServerErrorException('Invalid user');
  }

  const existingDomain = await this.restaurantRepository.findOne({
  where: { domainName: dto.domainName },
});

if (existingDomain) {
  throw new ForbiddenException('Domain name is already taken.');
}

  const existing = await this.restaurantRepository.findOne({
    where: { ownerId: owner.id },
  });

  if (existing) {
    throw new ForbiddenException("You already have a restaurant.");
  }

  try {
    const restaurant = this.restaurantRepository.create({
      ...dto,
      owner,
      ownerId: owner.id,
    });

   const savedRestaurant = await this.restaurantRepository.save(restaurant);
this.logger.log(`✅ Restaurant created successfully:`, savedRestaurant); // ✅ طباعة جميع القيم
return savedRestaurant;

  } catch (err) {
    this.logger.error(`Failed to create restaurant: ${err.message}`);
    throw new InternalServerErrorException('Failed to create restaurant');
  }
}

async getLocationByOwner(userId: string) {
  const restaurant = await this.restaurantRepository.findOne({
    where: { ownerId: userId },
    select: ['restaurantLocation'],
  });

  if (!restaurant) throw new NotFoundException('Restaurant not found');
  return restaurant.restaurantLocation;
}

async updateIdentityByOwner(ownerId: string, dto: {
  name?: string;
  description?: string;
  logo?: string;
  storeColor?: string;
}) {
  const restaurant = await this.restaurantRepository.findOne({ where: { ownerId } });
  if (!restaurant) throw new NotFoundException('Restaurant not found');

  Object.assign(restaurant, dto);
  return this.restaurantRepository.save(restaurant);
}

async updateContactByOwner(ownerId: string, dto: {
  phone?: string;
  contactNumber?: string;
  useAccountNumber?: boolean;
}) {
  const restaurant = await this.restaurantRepository.findOne({ where: { ownerId } });
  if (!restaurant) throw new NotFoundException('Restaurant not found');

  Object.assign(restaurant, dto);
  return this.restaurantRepository.save(restaurant);
}

async updateDomainByOwner(ownerId: string, domainName: string) {
  const restaurant = await this.restaurantRepository.findOne({ where: { ownerId } });
  if (!restaurant) throw new NotFoundException('Restaurant not found');

  if (restaurant.domainName) {
    throw new ForbiddenException('Domain name is already set and cannot be changed.');
  }

  const existing = await this.restaurantRepository.findOne({ where: { domainName } });
  if (existing) {
    throw new ForbiddenException('Domain name is already taken.');
  }

  restaurant.domainName = domainName;
  return this.restaurantRepository.save(restaurant);
}

async updateLocationByOwner(ownerId: string, dto: RestaurantLocationDto) {
  const restaurant = await this.restaurantRepository.findOne({
    where: { ownerId },
  });

  if (!restaurant) {
    throw new NotFoundException('Restaurant not found');
  }

  Object.assign(restaurant, {
    restaurantLocation: dto,
  });

  return await this.restaurantRepository.save(restaurant);
}

  async findMyRestaurants(owner: User): Promise<Restaurant[]> {
  return this.restaurantRepository.find({
    where: { ownerId: owner.id },
select: ['id', 'name', 'image', 'status', 'contactNumber'],
  });
}

  async findOne(id: string): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id },
      relations: { owner: true },
    });
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID "${id}" not found`);
    }
    return restaurant;
  }
  
  async update(
  id: string,
  dto: UpdateRestaurantDto,
  user: User,
): Promise<Restaurant> {
  const restaurant = await this.findOne(id);

  if (restaurant.ownerId !== user.id) {
    throw new ForbiddenException("You don't own this restaurant.");
  }

  try {
    // 👇 افصل التحديثات
    const {
      restaurantLocation,
      ...rest
    } = dto;

    Object.assign(restaurant, rest);

    // 👇 إذا فيه موقع، حدّثه أو أضفه
    if (restaurantLocation) {
      restaurant.restaurantLocation = {
        ...restaurant.restaurantLocation,
        ...restaurantLocation,
      };
    }

    const savedRestaurant = await this.restaurantRepository.save(restaurant);
this.logger.log(`✅ Restaurant updated successfully:`, savedRestaurant); // ✅ طباعة جميع القيم
return savedRestaurant;

  } catch (err) {
    this.logger.error(`Failed to update restaurant ${id}`, err.stack);
    throw new InternalServerErrorException('Failed to update restaurant');
  }
}

async remove(id: string, user: User): Promise<void> {
  const restaurant = await this.restaurantRepository.findOne({
    where: { id },
    relations: ['owner'],
  });

  if (!restaurant) throw new NotFoundException('Restaurant not found');
  if (restaurant.ownerId !== user.id) throw new ForbiddenException("You don't own this restaurant.");

  try {
    await this.restaurantRepository.manager.transaction(async (manager) => {
      // حذف العناصر المرتبطة أولاً
      await manager
        .createQueryBuilder()
        .delete()
        .from(Item)
        .where('restaurantId = :id', { id })
        .execute();

      // حذف الفئات المرتبطة ثانياً
      await manager
        .createQueryBuilder()
        .delete()
        .from(Category)
        .where('restaurantId = :id', { id })
        .execute();

      // حذف المطعم
      await manager.remove(Restaurant, restaurant);
      if (restaurant.image) {
  const fs = require('fs');
  const path = require('path');
  const filePath = path.join(process.cwd(), 'uploads', restaurant.image.replace('/uploads/', ''));
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    this.logger.log(`Deleted restaurant image file: ${filePath}`);
  }
}
    });

    this.logger.log(`Restaurant deleted successfully: ${id}`);
  } catch (error) {
    this.logger.error(`Failed to delete restaurant ${id}: ${error.message}`);
    throw new InternalServerErrorException('Failed to delete restaurant');
  }
}

  async updateImage(
    id: string,
    user: User,
    imagePath: string,
  ): Promise<Restaurant> {
    const restaurant = await this.findOne(id);
    if (restaurant.ownerId !== user.id) {
      throw new ForbiddenException("You don't own this restaurant.");
    }
    restaurant.image = imagePath;
    return this.restaurantRepository.save(restaurant);
  }

  async removeImage(id: string, user: User): Promise<Restaurant> {
    const restaurant = await this.findOne(id);
    if (restaurant.ownerId !== user.id) {
      throw new ForbiddenException("You don't own this restaurant.");
    }
    
    // Store the old image path for cleanup
    const oldImagePath = restaurant.image;
    
    // Remove image reference from database
    restaurant.image = null;
    const updatedRestaurant = await this.restaurantRepository.save(restaurant);

    // If there was an old image, try to delete the file
    if (oldImagePath) {
      try {
        const fs = require('fs');
        const path = require('path');
        const filePath = path.join(process.cwd(), 'uploads', oldImagePath.replace('/uploads/', ''));
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          this.logger.log(`Deleted image file: ${filePath}`);
        }
      } catch (error) {
        this.logger.error(`Failed to delete image file: ${error.message}`);
        // Don't throw error as the database update was successful
      }
    }

    return updatedRestaurant;
  }

  async findAllPublic(): Promise<Partial<Restaurant>[]> {
    return this.restaurantRepository.find({
      select: ['id', 'name', 'image'],
    });
  }

async findOnePublicByDomain(domain: string): Promise<Partial<Restaurant>> {
  const restaurant = await this.restaurantRepository.findOne({
    where: { domainName: domain },
  });

  if (!restaurant) {
    throw new NotFoundException('Restaurant not found');
  }

  return {
    id: restaurant.id,
    name: restaurant.name,
    description: restaurant.description,
    logo: restaurant.logo,
    storeColor: restaurant.storeColor,
    domainName: restaurant.domainName,
    restaurantLocation: restaurant.restaurantLocation,
  };
}

async findOnePublic(id: string): Promise<Partial<Restaurant>> {
  const restaurant = await this.restaurantRepository.findOne({
    where: { id },
    select: [
      'id',
      'name',
      'image',
      'description',
      'restaurantLocation',
      'contactNumber',
      'storeColor',
      'logo',
    ],
  });

  if (!restaurant) {
    throw new NotFoundException('Restaurant not found');
  }

  return restaurant;
}


async createItem(
  restaurantId: string,
  categoryId: string,
  user: User,
  data: { name: string; description?: string; price: number; imageUrl?: string },
): Promise<Item> {
  const restaurant = await this.restaurantRepository.findOne({
    where: { id: restaurantId },
    relations: ['owner'],
  });
  if (!restaurant || restaurant.owner.id !== user.id) {
    throw new ForbiddenException('Unauthorized');
  }

  const category = await this.categoryRepository.findOne({
    where: { id: categoryId },
    relations: ['restaurant'],
  });
  if (!category) {
    throw new NotFoundException('Category not found');
  }

  const item = this.itemRepository.create({
  name: data.name,
  description: data.description,
  price: data.price,
  imageUrl: data.imageUrl,
  category: category,     
  categoryId: category.id,
});

  return this.itemRepository.save(item);
}

// تابع لجلب العناصر لكل كاتاقوري
async getCategoryItems(
  restaurantId: string,
  categoryId: string,
  user: User
): Promise<Item[]> {
  const restaurant = await this.findOne(restaurantId);
  if (restaurant.ownerId !== user.id) {
    throw new ForbiddenException('Access denied');
  }

  return this.itemRepository
    .createQueryBuilder('item')
    .leftJoin('item.categories', 'category')
    .where('category.id = :categoryId', { categoryId })
    .getMany();
}

async createCategory(restaurantId: string, user: User, dto: { name: string; description?: string }) {
  const restaurant = await this.restaurantRepository.findOne({
    where: { id: restaurantId },
    relations: ['owner'],
  });

  if (!restaurant) throw new NotFoundException('Restaurant not found');
  if (restaurant.owner.id !== user.id) throw new ForbiddenException('Access denied');

  const category = this.categoryRepository.create({
    name: dto.name.trim(),
    description: dto.description?.trim() || '',
    restaurant,
  });

  return await this.categoryRepository.save(category);
}
async updateItem(restaurantId: string, itemId: string, user: User, data: any, categoryIds: string[]) {
  const restaurant = await this.restaurantRepository.findOne({
    where: { id: restaurantId },
    relations: ['owner'],
  });

  if (!restaurant || restaurant.owner.id !== user.id) {
    throw new ForbiddenException('Unauthorized');
  }

  const item = await this.itemRepository.findOne({
    where: { id: itemId },
    relations: ['category'], // Load existing relations to prevent data loss
  });

  if (!item) throw new NotFoundException('Item not found');

  // Apply regular data updates first
  Object.assign(item, data);

  // Handle category relationship properly
  if (categoryIds && Array.isArray(categoryIds) && categoryIds.length > 0) {
    const category = await this.categoryRepository.findOneBy({ id: categoryIds[0] });
    if (!category) throw new NotFoundException('Category not found');

    item.category = category;
    item.categoryId = category.id;
  }

  return this.itemRepository.save(item);
}

async getCategories(id: string, user: User): Promise<Category[]> {
  const restaurant = await this.restaurantRepository.findOne({
    where: { id },
    relations: ['owner'],
  });

  if (!restaurant) throw new NotFoundException('Restaurant not found');
  if (restaurant.owner.id !== user.id) throw new ForbiddenException('Access denied');

  return this.categoryRepository.find({
    where: { restaurant: { id } },
  });
}
}
