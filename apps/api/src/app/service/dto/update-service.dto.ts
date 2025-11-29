import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateServiceDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  rate?: number;

  @IsString()
  @IsOptional()
  currency?: string;
}
