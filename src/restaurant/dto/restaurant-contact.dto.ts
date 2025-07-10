import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateRestaurantContactDto {
  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  customPhone?: string;

  @IsOptional()
  @IsBoolean()
  useAccountNumber?: boolean;
}
