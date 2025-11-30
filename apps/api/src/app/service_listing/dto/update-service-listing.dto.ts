import { Min, IsNumber, IsString, IsOptional, IsArray } from 'class-validator';

export class UpdateServiceListingDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  priceFrom?: number;

  @IsString()
  @IsOptional()
  availabilitySchedule?: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  serviceAreas?: string[];

  @IsArray()
  @IsOptional()
  images?: string[];
}
