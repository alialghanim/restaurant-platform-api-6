import { IsString, IsUUID, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreateItemDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  price: number;

  @IsBoolean()
  isUnlimited: boolean;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsUUID()
  categoryId: string;

  @IsOptional()
  @IsString()
  imageUrl?: string | null;
}
