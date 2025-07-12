import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, IsEnum, ValidateNested, Min } from 'class-validator';

class OptionDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  price: number;
}

class SectionDto {
  @IsString()
  title: string;

  @IsEnum(['single', 'multiple'])
  type: 'single' | 'multiple';

  @IsNumber()
  @Min(0)
  min: number;

  @IsNumber()
  @Min(0)
  max: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  options: OptionDto[];
}

export class UpdateOptionsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SectionDto)
  sections: SectionDto[];
}
