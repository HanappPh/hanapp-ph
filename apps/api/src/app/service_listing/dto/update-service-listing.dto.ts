import { Min, IsNumber, IsString, IsOptional } from 'class-validator';

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

  @IsNumber()
  @IsOptional()
  @Min(0)
  priceTo?: number;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsString()
  @IsOptional()
  availabilitySchedule?: string;

  @IsString()
  @IsOptional()
  serviceAreas?: string;
}
