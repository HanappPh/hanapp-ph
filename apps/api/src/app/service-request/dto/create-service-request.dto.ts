import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsArray,
  IsDateString,
  Matches,
  Min,
  IsUUID,
} from 'class-validator';

export class CreateServiceRequestDto {
  @IsUUID()
  @IsOptional() // Allow it to be passed but not required
  clientId?: string;

  @IsNumber()
  @IsNotEmpty()
  categoryId!: number; // Changed to number: 1=Cleaning, 2=Tutoring, 3=Repair, 4=Delivery

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  @Min(0)
  rate!: number;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\+63\d{10}$/, {
    message: 'Contact must be in format +63XXXXXXXXXX',
  })
  contact!: string;

  @IsString()
  @IsOptional()
  contactLink?: string;

  @IsString()
  @IsNotEmpty()
  jobLocation!: string;

  @IsDateString()
  @IsNotEmpty()
  jobDate!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Time must be in HH:MM format',
  })
  jobTime!: string;

  @IsArray()
  @IsOptional()
  images?: string[];
}
