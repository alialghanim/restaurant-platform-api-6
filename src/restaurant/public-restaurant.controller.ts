import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { Public } from '../auth/decorators/public.decorator'; // إذا عندك ديكوريتور @Public()

@Controller('public/restaurants') //
export class PublicRestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  // ✅ جلب جميع المطاعم العامة
  @Public()
  @Get()
  findAll() {
    return this.restaurantService.findAllPublic();
  }

  // ✅ جلب مطعم معيّن بتفاصيله (Menus + Categories + Items)
  @Public()
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.restaurantService.findOnePublic(id);
  }
}
