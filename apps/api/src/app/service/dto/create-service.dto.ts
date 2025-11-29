import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  IsBoolean,
} from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  @IsNotEmpty()
  rate!: number;

  @IsString()
  @IsNotEmpty()
  charge!: string;

  @IsUUID()
  @IsNotEmpty()
  listingId!: string;

  @IsBoolean()
  @IsNotEmpty()
  isAddon!: boolean;
}
