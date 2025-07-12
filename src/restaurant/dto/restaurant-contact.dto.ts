import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateRestaurantContactDto {
  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  contactNumber?: string;

  @IsOptional()
  @IsBoolean()
  useAccountNumber?: boolean;
}
