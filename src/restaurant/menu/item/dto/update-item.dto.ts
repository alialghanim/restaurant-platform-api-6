// update-item.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateItemDto } from './create-item.dto';
import { IsOptional, IsString, ValidateIf } from 'class-validator';

export class UpdateItemDto extends PartialType(CreateItemDto) {
 @IsOptional()
@ValidateIf((_, value) => value !== undefined)
imageUrl?: string | null;
}