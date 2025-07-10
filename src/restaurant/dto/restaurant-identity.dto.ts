import { IsOptional, IsString } from 'class-validator';

export class UpdateRestaurantIdentityDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsString()
  storeColor?: string;

  @IsOptional()
  @IsString()
  cuisine?: string;
}
