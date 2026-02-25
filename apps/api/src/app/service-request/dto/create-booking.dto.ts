import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateNested,
  IsBoolean,
  IsDateString,
  Min,
  IsUUID,
} from 'class-validator';

export class BookingServiceDto {
  @IsString()
  @IsOptional()
  serviceDetailId?: string;

  @IsString()
  @IsOptional()
  customServiceName?: string;

  @IsString()
  @IsOptional()
  customServiceDescription?: string;

  @IsNumber()
  @Min(0)
  rate!: number;

  @IsBoolean()
  isCustom!: boolean;
}

export class CreateBookingDto {
  @IsUUID()
  @IsNotEmpty()
  listingId!: string;

  @IsUUID()
  @IsNotEmpty()
  providerId!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BookingServiceDto)
  services!: BookingServiceDto[];

  @IsDateString()
  @IsNotEmpty()
  scheduledDate!: Date;

  @IsString()
  @IsNotEmpty()
  scheduledTime!: string;

  @IsString()
  @IsNotEmpty()
  location!: string;

  @IsString()
  @IsNotEmpty()
  contactInfo!: string;

  @IsNumber()
  @Min(0)
  totalPrice!: number;

  @IsString()
  @IsOptional()
  additionalNotes?: string;
}
