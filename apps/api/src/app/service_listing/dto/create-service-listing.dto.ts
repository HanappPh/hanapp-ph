import {
  Min,
  IsUUID,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  ArrayNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateServiceListingDto {
  @IsUUID()
  @IsNotEmpty()
  providerId!: string;

  @IsUUID()
  @IsNotEmpty()
  categoryId!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  priceFrom?: number;

  @IsString()
  @IsNotEmpty()
  availabilitySchedule!: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  serviceAreas!: string[];

  @IsArray()
  @IsOptional()
  images?: string[];
}
