import { IsOptional, IsString, ValidateNested, IsBoolean, Matches } from 'class-validator';
import { Type } from 'class-transformer';
import { RestaurantLocationDto } from './restaurant-location.dto';

export class UpdateRestaurantDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => RestaurantLocationDto)
  restaurantLocation?: RestaurantLocationDto;

  @IsString()
  @IsOptional()
  cuisine?: string;

  @IsString()
  @IsOptional()
  logo?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  storeColor?: string;

  @IsOptional()
@IsString()
@Matches(/^[a-zA-Z0-9-_]+$/, {
  message: 'Domain name can only contain letters, numbers, dashes and underscores',
})
domainName?: string;

  @IsString()
  @IsOptional()
  customPhone?: string;

  @IsOptional()
  @IsBoolean()
  useAccountNumber?: boolean;
}
