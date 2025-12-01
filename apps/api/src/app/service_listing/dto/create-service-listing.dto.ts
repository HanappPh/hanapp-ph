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

// Type for availability schedule - can be string or object
export type AvailabilitySchedule =
  | string
  | {
      schedule?: string;
      display?: string;
      days?: string[];
      hours?: string;
      date_range_start?: string;
      date_range_end?: string;
      monday?: { available: boolean; start: string; end: string };
      tuesday?: { available: boolean; start: string; end: string };
      wednesday?: { available: boolean; start: string; end: string };
      thursday?: { available: boolean; start: string; end: string };
      friday?: { available: boolean; start: string; end: string };
      saturday?: { available: boolean; start: string; end: string };
      sunday?: { available: boolean; start: string; end: string };
      [key: string]: unknown;
    };

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

  @IsOptional()
  availabilitySchedule?: AvailabilitySchedule;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  serviceAreas!: string[];

  @IsArray()
  @IsOptional()
  images?: string[];
}
