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
  categoryId!: number; // 1=Cleaning, 2=Tutoring, 3=Repair, 4=Delivery

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsOptional()
  additional_requirements?: string;

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

  @IsString()
  @IsNotEmpty()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Time 2 must be in HH:MM format',
  })
  jobTime2!: string;

  @IsArray()
  @IsOptional()
  images?: string[];
}
