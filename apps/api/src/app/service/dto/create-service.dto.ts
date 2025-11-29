import { IsString, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

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
  currency!: string;

  @IsUUID()
  @IsNotEmpty()
  listingId!: string;
}
