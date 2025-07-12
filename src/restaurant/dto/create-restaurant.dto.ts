import { IsString, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { RestaurantLocationDto } from './restaurant-location.dto';

export class CreateRestaurantDto {
@IsNotEmpty({ message: 'Restaurant name is required.' })
@IsString({ message: 'Restaurant name must be a string.' })
@Transform(({ value }) => value?.trim())
name?: string;


  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  phone?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  cuisine?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  description?: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsString()
  storeColor?: string;

  @IsOptional()
  @IsString()
  domainName?: string;

  @IsOptional()
  @IsString()
  contactNumber?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => RestaurantLocationDto)
  restaurantLocation?: RestaurantLocationDto;
}
