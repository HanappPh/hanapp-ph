import { Min, IsUUID, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateServiceListingDto {
  @IsUUID()
  @IsNotEmpty()
  providerId!: string;

  @IsUUID()
  @IsNotEmpty()
  categoryId!: number;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  priceFrom!: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  priceTo!: number;

  @IsString()
  @IsNotEmpty()
  currency!: string;

  @IsString()
  @IsNotEmpty()
  availabilitySchedule!: string;

  @IsString()
  @IsNotEmpty()
  serviceAreas!: string;
}
